// 使用相对路径从仓库读取 Excel 文件
const fileURL = './database.xlsx'; // 相对路径

// 页面加载时获取 Excel 数据
window.onload = async () => {
    await fetchExcelData(fileURL);
};

// 获取 Excel 数据
async function fetchExcelData(url) {
    const response = await fetch(url);
    const data = await response.arrayBuffer(); // 读取为二进制数组
    const workbook = XLSX.read(data, { type: 'array' });

    // 读取 Excel 中的第一张表
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];

    // 将 Excel 数据转换为 JSON 格式
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // 初始化页面数据
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
            <strong>${item['编号']}</strong> ${item['性别']} ${item['年龄']}岁
            <p>${item['家庭情况']} | ${item['性格']}</p>
        `;
        itemDiv.addEventListener('click', () => showDetails(item));
        dataList.appendChild(itemDiv);
    });
}

// 显示详细信息
function showDetails(item) {
    const detailsPage = document.getElementById('detailsPage');
    const personalInfo = document.getElementById('personalInfo');
    const familyInfo = document.getElementById('familyInfo');
    const volunteerInfo = document.getElementById('volunteerInfo');
    const dataList = document.getElementById('dataList');

    detailsPage.style.display = 'block';
    personalInfo.textContent = item['个人情况'];
    familyInfo.textContent = item['家庭情况'];
    volunteerInfo.textContent = item['志愿者印象'];

    dataList.style.display = 'none';
}

// 返回列表
document.getElementById('backBtn').addEventListener('click', () => {
    const detailsPage = document.getElementById('detailsPage');
    const dataList = document.getElementById('dataList');

    detailsPage.style.display = 'none';
    dataList.style.display = 'block';
});
