package com.h2o.poppy.service;

import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class DirectoryService {

    public void createDirectory(String address) {
        // 띄어쓰기를 기준으로 주소를 단어로 나눔
        String[] words = address.split(" ");

        // 기본 디렉토리 경로 설정
        String basePath = "/app/data";

        // 기본 디렉토리가 존재하는지 확인하고 없으면 생성
        File baseDirectory = new File(basePath);
        if (!baseDirectory.exists()) {
            baseDirectory.mkdirs();
        }

        // 각 단어를 조합하여 하위 디렉토리 경로 생성
        StringBuilder directoryPathBuilder = new StringBuilder(basePath);
        for (String word : words) {
            directoryPathBuilder.append(File.separator).append(word);
        }

        // 생성된 디렉토리 경로 출력
        String directoryPath = directoryPathBuilder.toString();
        System.out.println("Directory Path: " + directoryPath);

        // 디렉토리 생성
        File directory = new File(directoryPath);
        if (!directory.exists()) {
            if (directory.mkdirs()) {
                System.out.println("Directory created successfully.");
            } else {
                System.out.println("Failed to create directory.");
            }
        } else {
            System.out.println("Directory already exists.");
        }
    }
}
