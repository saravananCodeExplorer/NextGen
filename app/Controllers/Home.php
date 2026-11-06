<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;
use Config\Email;
use Throwable;

class Home extends BaseController
{
    public function index(): string
    {
        return view('landing');
    }

    public function submitInquiry(): ResponseInterface
    {
        $services = [
            'School / College ERP',
            'Enterprise ERP Software',
            'Billing & POS Software',
            'Web & Mobile App Development',
            'Custom Software Development',
            'Digital Marketing & SEO',
            'Multiple / Full Suite Package',
        ];
        $rules = [
            'name'    => 'required|string|min_length[2]|max_length[100]',
            'email'   => 'required|string|valid_email|max_length[254]',
            'phone'   => 'required|string|min_length[7]|max_length[20]|regex_match[/^\+?[0-9][0-9 ().-]*$/]',
            'service' => 'required|string|in_list[' . implode(',', $services) . ']',
            'company' => 'permit_empty|string|max_length[150]',
            'message' => 'permit_empty|string|max_length[2000]',
        ];

        $input = $this->request->getPost();
        foreach ($input as $field => $value) {
            if (is_string($value)) {
                $input[$field] = trim($value);
            }
        }

        if (! $this->validateData($input, $rules)) {
            return $this->response->setJSON([
                'status'  => 'error',
                'message' => 'Please provide valid inquiry details.',
                'errors'  => $this->validator->getErrors(),
            ])->setStatusCode(400);
        }

        $data = $this->validator->getValidated();
        $config = config(Email::class);
        $failureMessage = 'We could not send your inquiry. Please try again later or email demomailid4343@gmail.com directly.';

        if ($config->protocol !== 'smtp'
            || trim($config->SMTPHost) === ''
            || trim($config->SMTPUser) === ''
            || $config->SMTPPass === ''
            || ! filter_var($config->fromEmail, FILTER_VALIDATE_EMAIL)
            || ! filter_var($config->recipients, FILTER_VALIDATE_EMAIL)
        ) {
            $this->logger->error('Inquiry email is unavailable: SMTP configuration is incomplete.');

            return $this->response->setJSON([
                'status'  => 'error',
                'message' => $failureMessage,
            ])->setStatusCode(503);
        }

        try {
            $email = service('email');
            $email->clear(true);
            $email->setFrom($config->fromEmail, $config->fromName);
            $email->setTo($config->recipients);
            $email->setReplyTo($data['email']);
            $email->setSubject('New website inquiry: ' . $data['service']);
            $email->setMailType('text');
            $email->setMessage(implode("\r\n", [
                'New inquiry from the Next Gen website',
                '',
                'Name: ' . $data['name'],
                'Company / Institution: ' . ($data['company'] ?? ''),
                'Email: ' . $data['email'],
                'Phone / WhatsApp: ' . $data['phone'],
                'Service: ' . $data['service'],
                '',
                'Project Details & Key Requirements:',
                $data['message'] ?? '',
            ]));

            if (! $email->send()) {
                $this->logger->error('Inquiry email was not accepted by the SMTP server.');

                return $this->response->setJSON([
                    'status'  => 'error',
                    'message' => $failureMessage,
                ])->setStatusCode(502);
            }
        } catch (Throwable $exception) {
            $this->logger->error('Inquiry email failed with {type}.', ['type' => $exception::class]);

            return $this->response->setJSON([
                'status'  => 'error',
                'message' => $failureMessage,
            ])->setStatusCode(502);
        }

        return $this->response->setJSON([
            'status'  => 'success',
            'message' => 'Thank you! Your inquiry has been sent to our team. We will contact you within 2 business hours.',
        ]);
    }
}
