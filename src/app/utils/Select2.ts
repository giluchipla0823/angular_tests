export class Select2 {
    static getDefaultOptions() {
      return {
          theme: 'bootstrap',
          placeholder: 'Seleccionar',
          allowClear: true,
          width: '100%',
          language: 'es'
      };
    }

    static setAttributesToValidate(element: JQuery, field: string) {
        element.attr({
            required: true,
            id: field,
            name: field,
            formControlName: name
        });

        element.addClass('select2-validator');

        element
            .on('select2:unselecting', function(e: JQuery.Event) {
                $(this).data('state', 'unselected');
            })
            .on('select2:open', function(e: JQuery.Event) {
                const $this =  $(this);

                if ($this.data('state') === 'unselected') {
                    $this.removeData('state');

                    setTimeout(() => {
                        $this.select2('close');
                    }, 0);
                }
            });
    }
}