/**
 * 
 */

 $(function(){
	 let rowCount=10;
	 let currentPage;
	 let count;
	 
	 /*
	 =========
	 댓글 목록
	 =========
	 */
	// 댓글 목록
	function selectList(pageNum){
		currentPage = pageNum;
		// 로딩 이미지 노출
		$('#loading').show();
		// 서버와 통신
		$.ajax({
			url:'listReply.do',
			type:'post',
			data:{pageNum:pageNum,rowCount:rowCount,board_num:$('#board_num').val()},
			dataType:'json',
			success:function(param){
				// 로딩 이미지 감추기
				$('#loading').hide();
				count = param.count;
				
				if(pageNum == 1){
					// 처음 호출시는 해당 ID의 div의 내부 내용물을 제거
					$('#output').empty();
				}
				
				$(param.list).each(function(index,item){
					let output = '<div class="item">';
					output+= '<h4>' + item.id + '</h4>';
					output+= '<div class="sub-item">';
					output += '<p>' + item.re_content + '</p>';
					
					if(item.re_modifydate){
						output += '<span class="modify-date"> 최근 수정일 : ' + item.re_modifydate + '</span>';
					}
					if(item.re_date){
						output += '<span class="reg-date"> 등록일 : ' + item.re_date + '</span>';
					}
					
					// 로그인한 회원번호와 작성자의 회원 번호 일치 여부 체크
					if(param.user_num == item.mem_num){
						output += ' <input type="button" data-renum="'+item.re_num+'" value="수정" class="modify-btn">';
						output += ' <input type="button" data-renum="'+item.re_num+'" value="삭제" class="delete-btn">';
					}
					
					output+= '<hr size="1" noshade width="100%">';
					output+= '</div>';
					output+= '</div>';
					
					$('#output').append(output);
				});
				
				if(currentPage >= Math.ceil(count/rowCount)){
					// 다음 페이지가 없음
					$('.paging-button').hide();
				} else {
					// 다음 페이지가 존재
					$('.paging-button').show();
				}
			},
			error:function(){
				$('#loading').hide();
				alert('네트워크 오류가 발생하였습니다.');
			}
		})
	}
	
	// 페이지 처리 이벤트 연결(다음 댓글 보기 버튼 클릭시 데이터 추가)
	$('.paging-button input').click(function(){
		selectList(currentPage + 1);
	});
	 /*
	 =========
	 댓글 등록
	 =========
	 */
	// 댓글 등록
	$('#re_form').submit(function(event){
		if($('#re_content').val().trim()==''){ 
			// 내용이 비워져 있다면
			alert('내용을 입력하세요');
			$('#re_content').val('').focus();
			return false;
		}
		
		// form 이하의 태그에 입력한 데이터를 모두 읽어서 쿼리 스트링으로 반환
		let form_data = $(this).serialize();
		
		// 서버와 통식
		$.ajax({
			url:'writeReply.do',
			type:'post',
			data:form_data,
			dataType:'json',
			success:function(param){
				if(param.result=='logout'){
					 alert('로그인 후 사용해주세요.');
				} else if(param.result=='success'){
					// 폼 초기화
					initForm();
					// 댓글 작성이 성공하면 새로 삽입한 글을 포함해서 첫번째 페이지의 게시글을 다시 호출한다.
					selectList(1);
				} else{
					alert('댓글 등록 중 오류가 발생하였습니다.')
				}
			},
			error:function(){
				alert('네트워크 오류가 발생하였습니다.');
			}
		});
		
		// 기본 이벤트 제거
		event.preventDefault();
		
	}); // submit event 발생
	
	
	// 댓글 작성 폼 초기화
	function initForm(){
		$('textarea').val('');
		$('#re_first .letter-count').text('300/300');
	}
	
	
	 /*
	 ======================
	 댓글 등록 및 수정 공통
	 =========
	 */
	// textarea에 내용 입력시 글자수 체크
	$(document).on('keyup','textarea',function(){
		// 입력한 글자수를 구한다
		let inputLength = $(this).val().length;
		if(inputLength > 300){
			// 300자가 넘어간다면 입력 불가 - subString을 사용하여 300자까지만 입력이 가능함 더 넘어서면 작성이 되지 않음
			$(this).val($(this).val().substring(0,300));
		} else { // 300자 이하의 경우
			let remain = 300 - inputLength;
			remain += '/300';
			if($(this).attr('id') == 're_content'){
				// 등록폼 글자수
				$('#re_first .letter-count').text(remain);
			} else {
				// 수정폼 글자수
				$('#mre_first .letter-count').text(remain);
			}
		}
	}); // on end
	
	
	
	 /*
	 =========
	 댓글 수정
	 =========
	 */
	
	
	
	
	
	
	 /*
	 =========
	 댓글 삭제
	 =========
	 */
	
	
	
	
	 /*
	 =========
	 목록 호출
	 =========
	 */
	
	selectList(1);
	
	
	
	
 })