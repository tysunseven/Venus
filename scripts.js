// 使用相对路径从仓库读取 Excel 文件
const fileURL = './database.xlsx'; // 相对路径

// 页面加载时获取 Excel 数据
window.onload = async () => {
    await fetchExcelData(fileURL);
};

// 获取 Excel 数据
async function fetchExcelData(url) {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: 'array' });

    // 读取 Excel 中的第一张表
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // 将 Excel 数据转换为 JSON 格式
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonData);  // 检查解析后的JSON数据

    initializePage(jsonData);
}

// 初始化页面数据
function initializePage(data) {
    const dataList = document.getElementById('dataList');
    dataList.innerHTML = '';  // 清空之前的内容

    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <strong>${item['id']}</strong> ${item['sex']} ${item['birthday']}岁
            <p>${item['tag1']} | ${item['tag2']} | ${item['tag3']}</p>
        `;
        itemDiv.addEventListener('click', () => showDetails(item));
        dataList.appendChild(itemDiv);
    });
}

// 显示详细信息
function showDetails(item) {
    const detailsPage = document.getElementById('detailsPage');
    const dataList = document.getElementById('dataList');

    document.getElementById('id').textContent = `ID: ${item['id']}`;
    document.getElementById('name').textContent = `姓名: ${item['name']}`;
    document.getElementById('sex').textContent = `性别: ${item['sex']}`;
    document.getElementById('birthday').textContent = `生日: ${item['birthday']}`;
    document.getElementById('address').textContent = `地址: ${item['address']}`;
    document.getElementById('school').textContent = `学校: ${item['school']}`;
    document.getElementById('personalInfo').textContent = `个人情况: ${item['personalInfo']}`;
    document.getElementById('familyInfo').textContent = `家庭情况: ${item['familyInfo']}`;
    document.getElementById('income').textContent = `收入: ${item['income']}`;
    document.getElementById('livingCondition').textContent = `居住条件: ${item['livingCondition']}`;
    document.getElementById('contact').textContent = `联系方式: ${item['contact']}`;
    document.getElementById('volunteerImpression').textContent = `志愿者印象: ${item['volunteerImpression']}`;
    document.getElementById('tags').textContent = `标签: ${item['tag1']} | ${item['tag2']} | ${item['tag3']}`;

    detailsPage.style.display = 'block';
    dataList.style.display = 'none';
}

// 返回列表
document.getElementById('backBtn').addEventListener('click', () => {
    const detailsPage = document.getElementById('detailsPage');
    const dataList = document.getElementById('dataList');

    detailsPage.style.display = 'none';
    dataList.style.display = 'block';
});
