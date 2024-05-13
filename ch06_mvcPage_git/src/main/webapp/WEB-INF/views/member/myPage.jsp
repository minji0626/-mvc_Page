<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>My Page</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/style.css">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap" rel="stylesheet">
<script type="text/javascript" src="<%= request.getContextPath() %>/js/jquery-3.7.1.min.js"></script>
<script type="text/javascript">
$(function(){
	$('#photo_btn').click(function(){
		$('#photo_choice').show();
		$(this).hide();
	}); // end of Click
	
	// 이미지 미리보기
	let photo_path = $('.my-photo').attr('src'); // 처음 화면에 보여지는 이미지 읽기
	$('#photo').change(function(){
		let my_photo = this.files[0];
		if(!my_photo){
			// 선택을 취소하면 원래 처음 화면으로 되돌림
			$('.my-photo').attr('src',photo_path);
			return;
		}
		if(my_photo.size > 1024*1024){
			alert(Math.round(my_photo.size/1024) + 'kbytes(1024kbytes까지만 업로드 가능)');
			$('.my-photo').attr('src',photo_path);
			$(this).val(''); // 선택한 파일 정보 지우기
			return;
		}
		// 화면에 이미지 미리보기
		const reader = new FileReader();
		reader.readAsDataURL(my_photo);
		
		reader.onload=function(){
			$('.my-photo').attr('src',reader.result);			
		};
	}); // end of Change
	
	// 이미지 미리보기 취소
	$('#photo_reset').click(function(){
		// 초기 이미지 표시
		$('.my-photo').attr('src',photo_path); // 이미지 미리보기 전 이미지로 되돌리기
		$('#photo').val('');
		$('#photo_choice').hide();
		$('#photo_btn').show(); // 수정 버튼 표시
		
	})
});
</script>
</head>
<body>
<div class="page-main">
	<jsp:include page="/WEB-INF/views/common/header.jsp"/>
	<div class="content-main">
	<h2>My Page</h2>
	<div class="mypage-div">
		<h3>Profile Photo</h3>
		<ul>
			<li>
				<c:if test="${empty member.photo}">
					<img alt="profile photo" src="${pageContext.request.contextPath}/images/face.png"
						width="200" height="200" class="my-photo">
				</c:if>
				<c:if test="${!empty member.photo}">
					<img alt="profile photo" src="${pageContext.request.contextPath}/upload/${member.photo}"
						width="200" height="200" class="my-photo">
				</c:if>
			</li>
			<li>
				<div class="align-center">
					<input type="button" value="수정" id="photo_btn">
				</div>
				<div id="photo_choice" style="display: none;">
					<input type="file" id="photo" accept="image/gif,image/png,image/jpeg">
					<input type="button" value="전송" id="photo_submit">
					<input type="button" value="취소" id="photo_reset">
				</div>
			</li>
		</ul>
		<h3>연락처 <input type="button" id="tel_btn" value="연락처 수정" onclick="location.href='modifyUserForm.do'"> </h3>
		
		<ul>
			<li>ID : ${member.id }</li>
			<li>이름 : ${member.name }</li>
			<li>전화번호 : ${member.phone }</li>
			<li>E-mail : ${member.email }</li>
			<li>우편번호 : ${member.zipcode }</li>
			<li>주소 : ${member.address1} ${member.address2}</li>
			<li>가입일 : ${member.reg_date }</li>
			<c:if test="${!empty member.modify_date }">
				<li>최근 정보 수정일 : ${member.modify_date }</li>
			</c:if>		
		</ul>
		<h3>비밀번호 수정</h3>
		<h3>회원 탈퇴</h3>
	</div>
	
	<div class="mypage-div">
		<h3>관심 게시물 목록</h3>
	</div>
	
	<div class="mypage-end">
	</div>
 </div>
</div>
</body>
</html>