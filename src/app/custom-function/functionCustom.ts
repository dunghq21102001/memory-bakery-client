export class functionCustom {

  static convertDate(date: any) {
      let fDate = new Date(date)
      return fDate.toLocaleString()
  }

  static convertVND(price: any) {
      return price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
  }

  static removeElementByValue(array: any, elem: any) {
      let index = array.indexOf(elem);
      if (index > -1) {
          array.splice(index, 1);
      }
  }

  static cloneArray(data: any) {
      return [...data]
  }

  static cloneObject(data: any) {
    return { ...data }
  }
}
