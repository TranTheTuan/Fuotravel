export function toFormData<T>(formValue: T) {
  const formData = new FormData();
  for (const key of Object.keys(formValue)) {
    if (key === 'images') {
      for (const i of formValue[key]) {
        formData.append('images[]', i, i.name);
      }
    } else {
      formData.append(key, formValue[key]);
    }
  }
  return formData;
}
