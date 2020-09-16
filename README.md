This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app

## 회원 차트 관리
* react 
* firebase

## 기능
* 로그인 기능 (firebase 인증 로그인)
* 회원 정보 등록 기능 (멀티 이미지 업로드)
* 회원 정보 수정 기능
* 회원 정보 리스트

## 사용 dependency
* antd (ui)
* typescript (제대로 사용 못한듯..)
* react router 

## Firebase
* cloud firestorm (key, value 정보 저장)
* storage (이미지 저장)

## Firebase 저장 구조
* collection - document - field
* customer - key - firestoreData{memo, name, phoneNumber, storageUrl[fileName, imageUrl(storageUrl)]}