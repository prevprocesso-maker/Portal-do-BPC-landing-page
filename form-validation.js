/* Portal do BPC — validação inline e conversão do formulário React */
(function () {
  'use strict';

  function addError(input, id) {
    var existing = document.getElementById(id);
    if (existing) return existing;
    var error = document.createElement('span');
    error.id = id;
    error.className = 'field-error';
    error.setAttribute('role', 'alert');
    error.setAttribute('aria-live', 'polite');
    input.parentElement.appendChild(error);
    var describedBy = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (describedBy.indexOf(id) === -1) describedBy.push(id);
    input.setAttribute('aria-describedby', describedBy.join(' '));
    return error;
  }

  function setError(input, error, message) {
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    error.textContent = message || '';
  }

  function bind(form) {
    if (!form || form.dataset.pdbpcValidationBound === 'true') return;
    form.dataset.pdbpcValidationBound = 'true';
    form.noValidate = true;

    var textInputs = form.querySelectorAll('input[type="text"]');
    var nome = form.querySelector('[name="nome"]') || textInputs[0];
    var whatsapp = form.querySelector('[name="whatsapp"]') || form.querySelector('input[type="tel"]');
    var paraQuem = form.querySelector('[name="para-quem"]') || form.querySelector('select');
    var situacao = form.querySelector('[name="situacao"]') || form.querySelector('textarea');
    var consentimento = form.querySelector('[name="consentimento"]') || form.querySelector('input[type="checkbox"]');
    if (!nome || !whatsapp || !paraQuem || !consentimento) return;

    nome.name = 'nome';
    whatsapp.name = 'whatsapp';
    if (situacao) situacao.name = 'situacao';
    consentimento.name = 'consentimento';

    var errors = {
      nome: addError(nome, 'lead-nome-error'),
      whatsapp: addError(whatsapp, 'lead-whatsapp-error'),
      paraQuem: addError(paraQuem, 'lead-para-error'),
      consentimento: addError(consentimento, 'lead-consent-error')
    };
    var status = form.querySelector('[data-pdbpc-form-status]');
    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-pdbpc-form-status', 'true');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.className = 'pdbpc-form-status';
      status.style.cssText = 'margin:14px 0 0;color:var(--ok);font-size:14px;line-height:1.45;';
      form.appendChild(status);
    }

    [nome, whatsapp, paraQuem, consentimento].forEach(function (input) {
      input.addEventListener('input', function () {
        var key = input === nome ? 'nome' : input === whatsapp ? 'whatsapp' : input === paraQuem ? 'paraQuem' : 'consentimento';
        setError(input, errors[key], '');
        status.textContent = '';
      });
      input.addEventListener('change', function () {
        var key = input === nome ? 'nome' : input === whatsapp ? 'whatsapp' : input === paraQuem ? 'paraQuem' : 'consentimento';
        setError(input, errors[key], '');
        status.textContent = '';
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();

      var values = {
        nome: nome.value.trim(),
        whatsapp: whatsapp.value.trim(),
        paraQuem: paraQuem.value.trim(),
        situacao: situacao ? situacao.value.trim() : '',
        consentimento: consentimento.checked
      };
      var messages = {
        nome: values.nome ? '' : 'Informe seu nome.',
        whatsapp: values.whatsapp ? '' : 'Informe seu WhatsApp.',
        paraQuem: values.paraQuem ? '' : 'Selecione uma opção.',
        consentimento: values.consentimento ? '' : 'Autorize o contato para continuar.'
      };
      setError(nome, errors.nome, messages.nome);
      setError(whatsapp, errors.whatsapp, messages.whatsapp);
      setError(paraQuem, errors.paraQuem, messages.paraQuem);
      setError(consentimento, errors.consentimento, messages.consentimento);

      var firstError = !values.nome ? nome : !values.whatsapp ? whatsapp : !values.paraQuem ? paraQuem : !values.consentimento ? consentimento : null;
      if (firstError) {
        firstError.focus();
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.setAttribute('aria-busy', 'true');
        button.disabled = true;
      }
      if (window.__pdbpcTrack) window.__pdbpcTrack('generate_lead', { form_id: 'contact-form', lead_type: 'whatsapp' });
      var message = 'Olá! Meu nome é ' + values.nome + '. WhatsApp: ' + values.whatsapp + '. Benefício: ' + values.paraQuem + '. ' + (values.situacao ? 'Situação: ' + values.situacao : '');
      window.open('https://wa.me/5521964238080?text=' + encodeURIComponent(message), '_blank');
      form.reset();
      [nome, whatsapp, paraQuem, consentimento].forEach(function (input) { input.setAttribute('aria-invalid', 'false'); });
      status.textContent = 'A mensagem foi preparada no WhatsApp. Se a nova janela não abriu, verifique o bloqueador de pop-ups.';
      if (button) {
        button.removeAttribute('aria-busy');
        button.disabled = false;
      }
    }, true);
  }

  function scan() {
    document.querySelectorAll('form.form-card').forEach(bind);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan, { once: true });
  else scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();
