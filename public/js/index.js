function select(){
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    console.log(language)
    switch(language){
        case "html":
            front();
            break;
        case "css":
            front();
            break;
        case "javascript":
            front();
            break;
        case "java":
            java();
            break;
        case "python":
            python();
            break;
        case "C언어":
            C_programing();
            break;
    }
        
}

function front() {   // select option이 html,css,js일때 api html,css,js코드 응답함수
    const api_key = "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"
    const keywords = document.getElementsByClassName('main_searchbar').value
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    console.log(language)
    $('#loading').show();

    const messages = [ //명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT, HTML, CSS, JS 언어로 '+ language +' for문 별찍기 문제를 HTML,CSS,JS 코드와 함께 제시해주세요. 제일먼제 문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""HTML Code:""" 여기에 HTML 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 HTML코드를 작성해주세요"""End HTML Code"""' },
        { role: 'assistant', content: '"""CSS Code:""" 여기에 CSS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 CSS코드를 작성해주세요"""End CSS Code"""' },
        { role: 'assistant', content: '"""JS Code:""" 여기에 JS 코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 JS코드를 작성해주세요"""End JS Code"""' },
        { role: 'assistant', content: '"""text:""" 여기에 제시한 코드들에 대한 설명을 작성해주세요. """End text Code"""' }]

    const data = { //데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    } 

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        }, // HTTP 통신
        data: JSON.stringify(data),  // 사용자 입력을 json형태로 변환해서 api에게 요청
    }).then(function (response) { //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""HTML Code:|"""CSS Code:|"""JS Code:|"""text:)/);

        console.log(splitResponse)
        let htmlCode = ''; //html코드가 들어갈 변수
        let cssCode = '';  //css코드가 들어갈 변수
        let jsCode = '';   //js코드가 들어갈 변수
        let apitext = '';  //api 설명이 들어갈 변수
        let currentCode = '';  //현재 작업중인 코드가 들어갈 변수


        for (let i = 0; i < splitResponse.length; i++) { // 응답 데이터 가공
            if (splitResponse[i].trim().startsWith('html')) {
                currentCode = 'HTML';       // 현재 작업중인 코드유형 저장장
                htmlCode = splitResponse[i].replace('html', '').trim();
            } else if (splitResponse[i].trim().startsWith('css')) {
                currentCode = 'CSS';
                cssCode = splitResponse[i].replace('css', '').trim();
            } else if (splitResponse[i].trim().startsWith('javascript')) {
                currentCode = 'JS';
                jsCode = splitResponse[i].replace('javascript', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'HTML':
                        htmlCode += splitResponse[i].trim();
                        break;
                    case 'CSS':
                        cssCode += splitResponse[i].trim();
                        break;
                    case 'JS':
                        jsCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        } 

        console.log(splitResponse)
        console.log(htmlCode)
        console.log(cssCode)
        console.log(jsCode)
        console.log(apitext)
        let f_text = splitResponse[0] + splitResponse[2]
        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + htmlCode + "\n\n" + cssCode + "\n\n" + jsCode + "\n\n" + apitext;

        console.log(pre)
        // result.appendChild(pre)

        document.getElementsByClassName('main_searchbar').value = ''//검색창 비우기
    });
}

function java() {   // select option이 java일때 api java 응답함수
    const api_key = "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"// api key 값
    const keywords = document.getElementsByClassName('main_searchbar').value // 사용자 입력 keywords 가져오기
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기

    console.log(language)
    $('#loading').show();


    const messages = [ // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + language + ' 언어로 for문 별찍기 문제를 ' + language + ' 코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""java Code:""" 여기에 java코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 java코드를 작성해주세요"""End java Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP통신
        data: JSON.stringify(data), // 사용자 입력을 json형태로 변환해서 api에게 요청
    }).then(function (response) { //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""java Code:)/);

        console.log(splitResponse)
        let javaCode = ''; //java코드가 들어갈 변수
        let apitext = '';  //api 설명이 들어갈 변수
        let currentCode = ''; //현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) { // 응답 데이터 가공
            if (splitResponse[i].trim().startsWith('java')) {
                currentCode = 'JAVA';       // 현재 작업중인 코드유형 저장장
                javaCode = splitResponse[i].replace('java', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'JAVA':
                        javaCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }   

        console.log(splitResponse)
        console.log(javaCode)
        console.log(apitext)
        let f_text = splitResponse[0]
        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + javaCode + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)

        document.getElementsByClassName('main_searchbar').value = '' //검색창 비우기
    });
}


function python() { // select option이 python일때 api python 응답함수
    const api_key = "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"  // api key 값
    const keywords = document.getElementsByClassName('main_searchbar').value // 사용자 입력 keywords 가져오기
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    console.log(language)
    $('#loading').show();

    const messages = [      // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + language + '언어로 if문 실습 문제를 ' + language + '코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""python Code:""" 여기에 python코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 python코드를 작성해주세요"""End python Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP 통신
        data: JSON.stringify(data),
    }).then(function (response) {   //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""python Code:)/); // 첫번째 응답 데이터 가공, split()

        console.log(splitResponse)
        let pythonCode = ''; // python코드가 들어갈 변수
        let apitext = '';   // api 설명이 들어갈 변수
        let currentCode = ''; // 현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) {
            if (splitResponse[i].trim().startsWith('python')) {
                currentCode = 'PYTHON';       // 현재 작업중인 코드유형 저장장
                pythonCode = splitResponse[i].replace('python', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'PYTHON':
                        pythonCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }   // 응답 데이터 가공 단계

        console.log(splitResponse)
        console.log(pythonCode)
        console.log(apitext)
        let f_text = splitResponse[0]
        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + pythonCode + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)

        document.getElementsByClassName('main_searchbar').value = '' 
    });
}

function C_programing() { // select option이 python일때 api python 응답함수
    const api_key = "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"  // api key 값
    const keywords = document.getElementsByClassName('main_searchbar').value // 사용자 입력 keywords 가져오기
    let languageElement = document.querySelector(".main_searchLanguage");
    let language = languageElement.options[languageElement.selectedIndex].value; // select 태그 사용자 선택 value값 가져오기
    console.log(language)
    $('#loading').show();

    const messages = [      // 명령 프롬프트
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'GPT,' + language + '로 if문 실습 문제를 ' + language + '코드와 함께 제시해주세요. 제일먼제 실습문제를 제시해주세요. 주석은 한글로 작성해주세요' },
        { role: 'assistant', content: '"""c Code:""" 여기에 C언어코드를 작성해주세요. 없다면 실습 문제에서 제시한 답안 C언어코드를 작성해주세요"""End c Code"""' }]


    const data = { // 데이터 구조
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        n: 1,
        messages: messages,
    }

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        method: 'POST',
        headers: {
            Authorization: "Bearer " + api_key,
            'Content-Type': 'application/json',
        },  // HTTP 통신
        data: JSON.stringify(data),
    }).then(function (response) {   //콜백함수, api 응답
        $('#loading').hide();
        console.log(response)
        const responseText = response.choices[0].message.content;
        const splitResponse = responseText.split(/(```|"""c Code:)/); // 첫번째 응답 데이터 가공, split()

        console.log(splitResponse)
        let pythonCode = ''; // c언어코드가 들어갈 변수
        let apitext = '';   // api 설명이 들어갈 변수
        let currentCode = ''; // 현재 작업중인 코드가 들어갈 변수

        for (let i = 0; i < splitResponse.length; i++) {
            if (splitResponse[i].trim().startsWith('c')) {
                currentCode = 'C';       // 현재 작업중인 코드유형 저장장
                pythonCode = splitResponse[i].replace('c', '').trim();
            } else if (splitResponse[i].trim().startsWith('')) {
                currentCode = 'text';
                apitext = splitResponse[i].replace('text', '').trim();
            }
            else {
                switch (currentCode) {
                    case 'C':
                        pythonCode += splitResponse[i].trim();
                        break;
                    case 'text':
                        apitext += splitResponse[i].trim();
                }
            }
        }   // 응답 데이터 가공 단계

        console.log(splitResponse)
        console.log(pythonCode)
        console.log(apitext)
        let f_text = splitResponse[0]
        let result = document.getElementsByClassName('main_searchWrap')
        let pre = document.createElement('pre')

        pre.innerText = f_text + "\n\n" + pythonCode + "\n\n" + apitext;

        console.log(pre)
        //result.appendChild(pre)

        document.getElementsByClassName('main_searchbar').value = '' 
    });
}