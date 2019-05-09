module.exports.function = function showImage (modeInfo) {
  const config = require('config');
  const fail = require('fail');
  const http = require('http');
  const console = require('console');
  
  let url ='';
  let response = null;
  let photoInfo = {
    photo : {}
  }
  
  const mode = String(modeInfo.mode);
  if (mode === 'cat'){
    // 설정한 property(capsule.properties)로부터 데이터를 가져오기
    url = config.get("catUrl");

    // API 호출
    response = http.getUrl(url, {format:"json", cacheTime: 0, returnHeaders:true});
    
    if(response.status == 404){
      throw fail.checkedError("결과 값이 없습니다.");
    }
    photoInfo = {
      photo: {
        url: response.parsed[0].url,
        caption : "고양이가 최고야!"
      }
    }
    
  }else if(mode === 'dog'){
    // TODO : shiba를 사용자로 부터 입력 받아오기
    const query = 'shiba';
    url = config.get("dogUrl") + query +'/images/random';
    response = http.getUrl(url, {format:"json", cacheTime: 0, returnHeaders:true});
    
    if(response.status == 404){
      throw fail.checkedError("결과 값이 없습니다.");
    }
    photoInfo = { 
      photo: {
        url: response.parsed.message,
        caption : query+'!!'
      }
    };
  }
  
  console.log(photoInfo.photo);
  return photoInfo;
}
