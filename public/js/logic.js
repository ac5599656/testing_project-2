

 


$("#test").on("click", brew);

function brew(event) {
    event.preventDefault();
    const key = "8e247686caec4c01ba0d5ca72a61e719";
    let search = "heineken";
    const url = `http://api.brewerydb.com/v2/?${search}/?key=${key}`;

    $.get(url, function (data, status) {
        console.log(data);
    });
};

let drink_num;
let bav;
switch (weight) {
    case weight <= 100:
        bav = drink_num * .0325
    case weight <= 120:
        bav = drink_num * .027
    case weight <= 140:
        bav = drink_num * .023
    case weight <= 160:
        bav = drink_num * .020
    case weight <= 180:
        bav = drink_num * .018
    case weight <= 200:
        bav = drink_num * .016
    case weight <= 220:
        bav = drink_num * .015
    case weight > 220:
        bav = drink_num * .014
        return bav;
    default:
        break;
}