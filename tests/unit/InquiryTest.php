<?php

use App\Controllers\Home;
use CodeIgniter\Email\Email as Mailer;
use CodeIgniter\HTTP\IncomingRequest;
use CodeIgniter\HTTP\ResponseInterface;
use CodeIgniter\HTTP\URI;
use CodeIgniter\HTTP\UserAgent;
use CodeIgniter\Test\CIUnitTestCase;
use Config\Email as EmailConfig;
use Config\Services;
use Psr\Log\NullLogger;

final class InquiryTest extends CIUnitTestCase
{
    private EmailConfig $emailConfig;

    protected function setUp(): void
    {
        parent::setUp();
        $this->emailConfig = config(EmailConfig::class);
        $this->emailConfig->protocol = 'smtp';
        $this->emailConfig->SMTPHost = '127.0.0.1';
        $this->emailConfig->SMTPUser = 'test-user';
        $this->emailConfig->SMTPPass = 'test-only-password';
        $this->emailConfig->fromEmail = 'demomailid4343@gmail.com';
        $this->emailConfig->fromName = 'Next Gen Technologies';
        $this->emailConfig->recipients = 'demomailid4343@gmail.com';
    }

    private function validInquiry(): array
    {
        return [
            'name' => 'Review Visitor',
            'email' => 'visitor@example.com',
            'phone' => '+91 98765 43210',
            'service' => 'School / College ERP',
            'company' => 'Example School',
            'message' => 'Please explain fees and attendance modules. <b>Literal text</b>',
        ];
    }

    private function mailer(): Mailer
    {
        $mailer = $this->createMock(Mailer::class);
        foreach (['clear', 'setFrom', 'setTo', 'setReplyTo', 'setSubject', 'setMailType', 'setMessage'] as $method) {
            $mailer->method($method)->willReturnSelf();
        }
        Services::injectMock('email', $mailer);

        return $mailer;
    }

    private function submit(array $post, ?array $requestValues = null): ResponseInterface
    {
        $request = new IncomingRequest(config('App'), new URI('http://localhost:8080/inquiry'), null, new UserAgent());
        $request->setMethod('POST');
        $request->setHeader('Content-Type', 'application/x-www-form-urlencoded');
        $request->setGlobal('post', $post);
        $request->setGlobal('request', $requestValues ?? $post);
        $controller = new Home();
        $controller->initController($request, service('response'), new NullLogger());

        return $controller->submitInquiry();
    }

    public function testSuccessRequiresSmtpAcceptanceAndIncludesAllInquiryDetails(): void
    {
        $mailer = $this->mailer();
        $mailer->expects($this->once())->method('setFrom')->with('demomailid4343@gmail.com', 'Next Gen Technologies');
        $mailer->expects($this->once())->method('setTo')->with('demomailid4343@gmail.com');
        $mailer->expects($this->once())->method('setReplyTo')->with('visitor@example.com');
        $mailer->expects($this->once())->method('setMailType')->with('text');
        $mailer->expects($this->once())->method('setMessage')->with($this->callback(function (string $body): bool {
            foreach ($this->validInquiry() as $value) {
                $this->assertStringContainsString($value, $body);
            }
            return true;
        }));
        $mailer->expects($this->once())->method('send')->willReturn(true);
        $response = $this->submit($this->validInquiry());
        $this->assertSame(200, $response->getStatusCode());
        $this->assertSame('success', json_decode($response->getJSON(), true)['status']);
    }

    public function testUnconfiguredPasswordReturnsUnavailableWithoutSending(): void
    {
        $this->emailConfig->SMTPPass = '';
        $this->mailer()->expects($this->never())->method('send');
        $response = $this->submit($this->validInquiry());
        $this->assertSame(503, $response->getStatusCode());
        $this->assertSame('error', json_decode($response->getJSON(), true)['status']);
    }

    public function testSmtpRejectionReturnsErrorInsteadOfSuccess(): void
    {
        $this->mailer()->expects($this->once())->method('send')->willReturn(false);
        $response = $this->submit($this->validInquiry());
        $this->assertSame(502, $response->getStatusCode());
        $this->assertSame('error', json_decode($response->getJSON(), true)['status']);
    }

    public function testTransportExceptionDoesNotLeakDetailsOrReturnSuccess(): void
    {
        $this->mailer()->expects($this->once())->method('send')->willThrowException(new RuntimeException('private SMTP details'));
        $response = $this->submit($this->validInquiry());
        $this->assertSame(502, $response->getStatusCode());
        $this->assertStringNotContainsString('private SMTP details', $response->getJSON());
    }

    public function testArrayServiceIsRejectedWithoutSending(): void
    {
        $data = $this->validInquiry();
        $data['service'] = ['School / College ERP'];
        $this->mailer()->expects($this->never())->method('send');
        $this->assertSame(400, $this->submit($data)->getStatusCode());
    }

    public function testUnknownServiceIsRejectedWithoutSending(): void
    {
        $data = $this->validInquiry();
        $data['service'] = 'arbitrary';
        $this->mailer()->expects($this->never())->method('send');
        $this->assertSame(400, $this->submit($data)->getStatusCode());
    }

    public function testAlphabeticPhoneIsRejectedWithoutSending(): void
    {
        $data = $this->validInquiry();
        $data['phone'] = 'abcdefg';
        $this->mailer()->expects($this->never())->method('send');
        $this->assertSame(400, $this->submit($data)->getStatusCode());
    }

    public function testQueryValuesCannotReplaceMissingPostFields(): void
    {
        $this->mailer()->expects($this->never())->method('send');
        $this->assertSame(400, $this->submit([], $this->validInquiry())->getStatusCode());
    }
}
