document.addEventListener('DOMContentLoaded', () => {
    const mindmap = document.querySelector('.mindmap');
    // 메인 토픽의 중앙 좌표 계산
    const mainTopic = document.querySelector('.main-topic');
    const mainButton = document.querySelector('.main-button');

    const mainCenterX = mainTopic.offsetLeft;
    const mainCenterY = mainTopic.offsetTop;

    let subTopicCount = 0;

    // main-button 클릭 시 서브토픽을 추가하는 함수
    mainButton.addEventListener('click', function() {
        if (subTopicCount >= 4) {
            alert('서브토픽은 최대 4개까지만 추가할 수 있습니다.');
            return;
        }
        // 서브토픽 div 요소 생성
        const newSubTopic = document.createElement('div');
        newSubTopic.classList.add('sub-topic');
        mindmap.appendChild(newSubTopic);
        //여기부터 arrangeSubTopic함수
        
        const radiusX = 300; // 가로 반지름 (기본값)
        const radiusY = 150; // 세로 반지름 (조금 줄여서 위아래 간격을 좁힘)
        const angleStep = (2 * Math.PI) / 4; // 4개의 서브토픽을 균등한 간격으로 배치

        const angle = subTopicCount * angleStep; // 각도 계산
        const newX = mainCenterX + radiusX * Math.cos(angle) - newSubTopic.offsetWidth / 2;
        const newY = mainCenterY + radiusY * Math.sin(angle) - newSubTopic.offsetHeight / 2;

        newSubTopic.style.left = `${newX}px`;
        newSubTopic.style.top = `${newY}px`;

        // 서브토픽 버튼 생성
        const subButton = document.createElement('button');
        subButton.classList.add('add-button');
        subButton.textContent = '+';
        newSubTopic.appendChild(subButton); // 버튼을 서브토픽에 추가

        //서브아이템 컨테이너 생성
        const subItemContainer = document.createElement('div');
        subItemContainer.classList.add('subitem-container');
        newSubTopic.appendChild(subItemContainer);//서브아이템 컨테이너를 서브토픽에 추가

        // 서브 아이템 컨테이너를 부모 서브 토픽과 동일한 위치에 배치
        subItemContainer.style.position = 'relative';
        subItemContainer.style.width = `${newSubTopic.offsetWidth}px`;
        subItemContainer.style.height = `${newSubTopic.offsetHeight}px`;
        const subItemConX = newSubTopic.offsetLeft+newSubTopic.offsetWidth;
        const subItemConY = newSubTopic.offsetTop+newSubTopic.offsetHeight;

        subButton.addEventListener('click', () => {
            addSubItems(subItemContainer);
        });

        subTopicCount++;
        //drawLines(newSubTopic);
    });
    
    // 서브 아이템 추가 및 원형 배치
    function addSubItems(parent) {

        const subItems = [];
        for (let i = 0; i < 4; i++) {
            const subItem = document.createElement('div');
            subItem.classList.add('subitem');
            subItem.textContent = `Item ${i + 1}`;
            parent.appendChild(subItem);
            subItems.push(subItem);
        }
        arrangeSubItems(parent, subItems);
        drawSubItemLines(parent, subItems);
    }

    // 서브 아이템 원형 배치 함수
    function arrangeSubItems(container, items) {
        const containerWidth = container.offsetWidth; // 부모 컨테이너 너비
        const containerHeight = container.offsetHeight; // 부모 컨테이너 높이
        const centerX = containerWidth / 2; // 컨테이너 중심 X 좌표
        const centerY = containerHeight / 2; // 컨테이너 중심 Y 좌표
    
        const radius = 120; // 배치 반지름
        const angleStep = (0.75 * Math.PI) / items.length; // 각도 간격
    
        items.forEach((item, index) => {
            const angle = index * angleStep;
            const x = centerX + radius * Math.cos(angle) - item.offsetWidth / 2;
            const y = centerY + radius * Math.sin(angle) - item.offsetHeight / 2;
    
            item.style.position = 'absolute'; // 부모 기준 배치
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
        });
    }

    // 서브 토픽과 서브 아이템 간 선 연결 함수
    function drawSubItemLines(parent, items) {
        const parentWidth = parent.offsetWidth; // 부모 너비
        const parentHeight = parent.offsetHeight; // 부모 높이
        const parentCenterX = parent.offsetLeft + parentWidth / 2; // 부모 중심 X
        const parentCenterY = parent.offsetTop + parentHeight / 2; // 부모 중심 Y
    
        items.forEach(item => {
            const itemWidth = item.offsetWidth; // 아이템 너비
            const itemHeight = item.offsetHeight; // 아이템 높이
            const itemLeft = item.offsetLeft + itemWidth / 2; // 아이템 중심 X
            const itemTop = item.offsetTop + itemHeight / 2; // 아이템 중심 Y
    
            // 두 점 사이의 거리 계산
            const distanceX = itemLeft - parentCenterX;
            const distanceY = itemTop - parentCenterY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    
            // 두 점 사이의 각도 계산
            const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
    
            // 선 요소 생성
            const line = document.createElement('div');
            line.classList.add('connector'); // 선의 스타일 클래스
            line.style.width = `${distance}px`; // 선의 길이 설정
            line.style.left = `${parentCenterX}px`; // 선의 시작점 X
            line.style.top = `${parentCenterY}px`; // 선의 시작점 Y
            line.style.transform = `rotate(${angle}deg)`; // 선의 회전 각도
    
            // 선을 서브 토픽의 부모에 추가
            parent.appendChild(line);
        });
    }
     // 선 그리기 함수
     function drawLines(subTopic) {

        const subCenterX = subTopic.offsetLeft + subTopic.offsetWidth / 2;
        const subCenterY = subTopic.offsetTop + subTopic.offsetHeight / 2;

        // 두 점 사이의 거리 계산 (선 길이)
        const distanceX = subCenterX - mainCenterX;
        const distanceY = subCenterY - mainCenterY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

        
        // 선 요소 생성
        const line = document.createElement('div');
        line.classList.add('connector');
        line.style.left = `${mainCenterX}px`;
        line.style.top = `${mainCenterY}px`;
        line.style.width = `${distance}px`;

        

        // 선의 각도 계산 (두 점 사이의 각도)
        const angle = Math.atan2(distanceY, distanceX) * (180 / Math.PI);
        line.style.transform = `rotate(${angle}deg)`;


        // 선을 서브토픽 컨테이너에 추가
        subTopic.appendChild(line);
    }
});
