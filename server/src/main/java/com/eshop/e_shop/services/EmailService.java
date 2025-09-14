package com.eshop.e_shop.services;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
@SuppressWarnings("unused")

@Service
public class AuthService {

    private final JavaMailSender javaMailSender;

    public AuthService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }


    public void sendVerificationEmail(String to, String code) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(to);
        helper.setSubject("E-Shop Signup Verification Code");
        helper.setText("Your verification code is: " + code, true);
        javaMailSender.send(message);
    }

}
