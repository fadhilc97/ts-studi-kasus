interface ITabungan {
  tanggal: Date;
  nominal: number;
}

const tabungan: ITabungan[] = [
  { tanggal: new Date(2023, 5, 17), nominal: 100000 },
  { tanggal: new Date(2023, 5, 18), nominal: 50000 },
  { tanggal: new Date(2023, 5, 19), nominal: 75000 },
];

const tanggalInput = document.querySelector("#tanggal") as HTMLInputElement;
const nominalInput = document.querySelector("#nominal") as HTMLInputElement;

const generateObject = (tanggal: Date, nominal: number): ITabungan => {
  return { tanggal, nominal };
};

const showLeadingZero = (x: number): string => {
  return x < 10 ? "0" : "";
};

const thousandSeparator = (x: number): string => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formattedDate = (rawDate: Date | string): string => {
  const rawDateObject: Date = new Date(rawDate);
  const day: number = rawDateObject.getDay();
  const month: number = rawDateObject.getMonth();
  const year: number = rawDateObject.getFullYear();

  return `${showLeadingZero(day)}${day}-${showLeadingZero(
    month
  )}${month}-${year}`;
};

// load tabungan
const loadTabungan = () => {
  const tabunganTbody = document.querySelector(
    "#table-daftar-tabungan tbody"
  ) as HTMLElement;
  tabunganTbody.innerHTML = "";
  for (const t of tabungan) {
    tabunganTbody?.append(loadTabunganItem(t));
  }
};

const resetInput = () => {
  tanggalInput.valueAsDate = new Date();
  nominalInput.value = "0";
};

// load tabungan tiap barisnya
const loadTabunganItem = (tabunganItem: ITabungan) => {
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
  const formInputNominal = document.querySelector(
    "#form-input-nominal"
  ) as HTMLFormElement;
  formInputNominal.addEventListener("submit", (event) => {
    event.preventDefault();
    addTabungan();
  });

  loadTabungan();
  resetInput();
});
