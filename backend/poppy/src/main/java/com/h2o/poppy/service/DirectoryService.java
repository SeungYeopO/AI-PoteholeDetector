package com.h2o.poppy.service;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class DirectoryService {

    public synchronized int createDirectory(String address) {
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
        Path path = Paths.get(directoryPath);
        if (Files.exists(path)) {
            System.out.println("Directory already exists.");
            return 2;
        }
        try {
            Files.createDirectories(path);
            System.out.println("Directory created successfully.");
            return 1;
        } catch (IOException e) {
            System.out.println("Failed to create directory due to an error: " + e.getMessage());
            return 0;
        }
    }
}
