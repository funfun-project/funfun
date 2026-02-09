export function validationInput(type: string, value: string | Date | number) {
  switch (type) {
    case 'title': {
      const regex: RegExp = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,16}$/;
      const result = regex.test(value as string);
      return result;
    }
    case 'category': {
      const regex: RegExp = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,14}$/;
      const result = regex.test(value as string);
      return result;
    }
    case 'address': {
      return value ? true : false;
    }
    case 'date': {
      const now = new Date();
      const target = new Date(value);

      if (isNaN(target.getTime())) {
        return false;
      }

      return target.getTime() > now.getTime();
    }
    case 'maxPeople': {
      return (value as number) <= 30 ? true : false;
    }
    case 'during': {
      return (value as number) <= 20 ? true : false;
    }
    case 'explain': {
      const regex: RegExp = /^(?=.*[가-힣A-Za-z0-9])[가-힣A-Za-z0-9 ]{1,100}$/;
      const result = regex.test(value as string);
      return result;
    }
    default:
      return false;
  }
}
