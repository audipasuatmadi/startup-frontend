export const onEnterFocusToNextElement = (step: number = 1) => (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + step].focus();
    }
  }