package com.h2o.poppy.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
public class S3Service {

    private final AmazonS3 s3Client;

    public S3Service(@Value("${aws.access-key-id}") String accessKeyId,
                     @Value("${aws.secret-key}") String secretKey,
                     @Value("${aws.region}") String region) {
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(accessKeyId, secretKey);
        this.s3Client = AmazonS3ClientBuilder.standard()
                .withRegion(region)
                .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
                .build();
    }

    public void createFolder(String folderName) {
        String bucketName = "poppys3";
        String folderKey = folderName.endsWith("/") ? folderName : folderName + "/";
        if (!s3Client.doesObjectExist(bucketName, folderKey)) {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentLength(0);
            PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, folderKey, new ByteArrayInputStream(new byte[0]), metadata);
            s3Client.putObject(putObjectRequest);
            System.out.println("Folder created successfully in bucket: " + bucketName);
        } else {
            System.out.println("Folder already exists in bucket: " + bucketName);
        }
    }

    public void uploadFile(String folderName, MultipartFile file) throws IOException {
        String bucketName = "poppys3";
        String folderKey = folderName.endsWith("/") ? folderName : folderName + "/";
        String fileKey = folderKey + file.getOriginalFilename();
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileKey, file.getInputStream(), metadata);
        s3Client.putObject(putObjectRequest);
        System.out.println("File uploaded successfully to " + fileKey);
    }
}
