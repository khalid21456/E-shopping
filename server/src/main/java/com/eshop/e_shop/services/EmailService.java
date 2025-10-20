package com.eshop.e_shop.services;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
@SuppressWarnings("unused")

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    /*
    @Async
    public void sendVerificationEmail(String to, String code) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("eshop@freelance.mailtrap.link");
        message.setTo(to);
        message.setSubject("E-Shop Signup Verification Code");
        message.setText("Your verification code is: " + code);
        javaMailSender.send(message);
    }
    */

    public void sendVerificationEmail(String to, String code) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("E-Shop Signup Verification Code");
        message.setText("Your verification code is: " + code);
        message.setFrom("mailtrap@demomailtrap.com");
        javaMailSender.send(message);
    }


}
