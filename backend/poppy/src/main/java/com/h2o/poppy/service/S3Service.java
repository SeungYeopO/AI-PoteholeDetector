package com.h2o.poppy.service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    public void createBucket(String bucketName) {
        if (!s3Client.doesBucketExistV2(bucketName)) {
            s3Client.createBucket(bucketName);
            System.out.println("Bucket created successfully.");
        } else {
            System.out.println("Bucket already exists.");
        }
    }
}
