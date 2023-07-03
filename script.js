const tabungan = [
    { tanggal: new Date(2023, 5, 17), nominal: 100000 },
    { tanggal: new Date(2023, 5, 18), nominal: 50000 },
    { tanggal: new Date(2023, 5, 19), nominal: 75000 },
];
const tanggalInput = document.querySelector("#tanggal");
const nominalInput = document.querySelector("#nominal");
const generateObject = (tanggal, nominal) => {
    return { tanggal, nominal };
};
const showLeadingZero = (x) => {
    return x < 10 ? "0" : "";
};
const thousandSeparator = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const formattedDate = (rawDate) => {
    const rawDateObject = new Date(rawDate);
    const day = rawDateObject.getDay();
    const month = rawDateObject.getMonth();
    const year = rawDateObject.getFullYear();
    return `${showLeadingZero(day)}${day}-${showLeadingZero(month)}${month}-${year}`;
};
// load tabungan
const loadTabungan = () => {
    const tabunganTbody = document.querySelector("#table-daftar-tabungan tbody");
    tabunganTbody.innerHTML = "";
    for (const t of tabungan) {
        tabunganTbody === null || tabunganTbody === void 0 ? void 0 : tabunganTbody.append(loadTabunganItem(t));
    }
};
const resetInput = () => {
    tanggalInput.valueAsDate = new Date();
    nominalInput.value = "0";
};
// load tabungan tiap barisnya
const loadTabunganItem = (tabunganItem) => {
    const tabunganTr = document.createElement("tr");
    const tabunganTanggalTd = document.createElement("td");
    tabunganTanggalTd.innerText = formattedDate(tabunganItem.tanggal);
    const tabunganNominalTd = document.createElement("td");
    tabunganNominalTd.innerText = thousandSeparator(tabunganItem.nominal);
    tabunganTr.append(tabunganTanggalTd, tabunganNominalTd);
    return tabunganTr;
};
// tambahkan data tabungan
const addTabungan = () => {
    const tanggal = tanggalInput.value;
    const nominal = nominalInput.value;
    const tabunganObject = generateObject(new Date(tanggal), parseInt(nominal));
    tabungan.push(tabunganObject);
    loadTabungan();
    resetInput();
};
document.addEventListener("DOMContentLoaded", () => {
    // submit add tabungan
    const formInputNominal = document.querySelector("#form-input-nominal");
    formInputNominal.addEventListener("submit", (event) => {
        event.preventDefault();
        addTabungan();
    });
    loadTabungan();
    resetInput();
});
