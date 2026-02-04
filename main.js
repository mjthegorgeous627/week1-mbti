const mbtis = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];

const mbti1 = document.getElementById('mbti1');
const mbti2 = document.getElementById('mbti2');
const relation = document.getElementById('relation');
const resultEl = document.getElementById('result');
const coupleRoles = document.getElementById('coupleRoles');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

mbtis.forEach(m => {
  mbti1.insertAdjacentHTML('beforeend', `<option value="${m}">${m}</option>`);
  mbti2.insertAdjacentHTML('beforeend', `<option value="${m}">${m}</option>`);
});

function updateRelationUI() {
  coupleRoles.classList.toggle('hidden', relation.value !== 'couple');
}

relation.addEventListener('change', updateRelationUI);
updateRelationUI();

function analyze() {
  const rText = relation.options[relation.selectedIndex].text;
  const m1 = mbti1.value;
  const m2 = mbti2.value;

  let intro = `${rText}에서 ${m1}와 ${m2}의 관계는 성향의 좋고 나쁨이 아니라, 서로를 이해하는 방식의 차이에서 밀도가 달라집니다.`;

  if (relation.value === 'couple') {
    const role1 = document.getElementById('role1').value === 'girlfriend' ? '여자친구' : '남자친구';
    const role2 = document.getElementById('role2').value === 'girlfriend' ? '여자친구' : '남자친구';
    intro = `${rText} 관계에서 ${role1}인 ${m1}, 그리고 ${role2}인 ${m2}는 사랑을 표현하고 받아들이는 방식이 다르게 작동하는 경우가 많습니다.`;
  }

  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div class="section-title">관계의 기본 흐름</div>
    <p>${intro}</p>

    <div class="section-title">자주 반복되는 장면</div>
    <p>한쪽은 충분히 신경 쓰고 있다고 느끼지만, 다른 한쪽은 그 마음을 체감하지 못하는 순간이 반복되기 쉽습니다. 이때 서운함은 말로 표현되지 않고 쌓이는 경우가 많습니다.</p>

    <div class="section-title">감정이 어긋나는 이유</div>
    <p>${m1}는 상황을 자기 기준으로 소화한 뒤 반응하는 편이고, ${m2}는 상대의 반응을 통해 자신의 감정을 확인하려는 경향이 있습니다. 이 차이는 오해로 이어지기 쉽지만, 악의 때문은 아닙니다.</p>

    <div class="section-title">관계를 편안하게 만드는 관점</div>
    <p>이 관계에서 중요한 것은 누가 더 옳은지가 아니라, <span class="highlight">서로가 다르게 신경 쓰고 있다는 사실을 먼저 인정하는 것</span>입니다. 이해받고 싶다는 마음을 조금만 더 구체적으로 표현해 보세요.</p>
  `;
}

function toggleTheme() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light-mode');
    } else {
        localStorage.removeItem('theme');
    }
}

function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
}

document.getElementById('analyzeBtn').addEventListener('click', analyze);
themeToggle.addEventListener('click', toggleTheme);

applyTheme();
