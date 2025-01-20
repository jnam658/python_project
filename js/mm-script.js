document.addEventListener('DOMContentLoaded', () => {
    // 메인 토픽의 중앙 좌표 계산
    const mainTopic = document.querySelector('.main-topic');
    const mainButton = document.querySelector('.main-button');
    const subTopicContainer = document.querySelector('.sub-topic-container');

    const mainTopicRect = mainTopic.getBoundingClientRect();
    const mainCenterX = mainTopicRect.left + mainTopicRect.width / 2;
    const mainCenterY = mainTopicRect.top + mainTopicRect.height / 2;

    let subTopics = document.querySelectorAll('.sub-topic');
    let subTopicCount = 0;

    // main-button 클릭 시 서브토픽을 추가하는 함수
    mainButton.addEventListener('click', function() {
        if(subTopicCount >= 4){
            alert('서브토픽은 최대 4개까지만 추가할 수 있습니다.');
            return;
        }
        // 서브토픽 div 요소 생성
        const newSubTopic = document.createElement('div');
        newSubTopic.classList.add('sub-topic'); // 클래스를 추가해서 스타일을 적용

        // 서브토픽 안에 버튼을 넣기
        const subButton = document.createElement('button');
        subButton.classList.add('add-button');
        subButton.textContent = '+';

        newSubTopic.appendChild(subButton); // 버튼을 서브토픽에 추가
        subTopicContainer.appendChild(newSubTopic); // 서브토픽을 sub-topic-container에 추가

        subTopicCount++;
        drawLines();
    });

    // 선 그리기 함수
    function drawLines() {
        // 기존 선 제거
        const existingLines = document.querySelectorAll('.connector');
        existingLines.forEach(line => line.remove());

        // 서브 토픽이 개수가 변할 수 있으므로 다시 선택
        subTopics = document.querySelectorAll('.sub-topic');

        // 서브토픽에 대한 선 그리기
        subTopics.forEach(subTopic => {
            const subRect = subTopic.getBoundingClientRect();
            const subCenterX = subRect.left + subRect.width / 2;
            const subCenterY = subRect.top + subRect.height / 2;

            // 선을 그릴 div 요소 생성
            const line = document.createElement('div');
            line.classList.add('connector');

            // 두 점 사이의 거리 계산 (선 길이)
            const distanceX = subCenterX - mainCenterX;
            const distanceY = subCenterY - mainCenterY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

            // 선 길이 설정
            line.style.width = `${distance}px`;

            // 선의 각도 계산 (두 점 사이의 각도)
            const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
            line.style.transform = `rotate(${angle}deg)`;

            // 선의 시작 위치 설정 (mainCenterX, mainCenterY는 메인 토픽의 중심)

            // 선을 서브토픽 컨테이너에 추가
            subTopicContainer.appendChild(line);
        });
    }
});
