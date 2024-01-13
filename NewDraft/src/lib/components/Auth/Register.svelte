<script>
  import { t } from '$lib/translations';
  import { enhance, applyAction } from '$app/forms';
  import { FormValidatorUtils, toaster } from '$lib';
  import { goto } from '$app/navigation';
  import { getToastStore } from '@skeletonlabs/skeleton';

  const popToast = toaster(getToastStore());
  const enhanceHandler = ({ cancel }) => {
    if (preventSubmit) cancel();
    return async ({ result }) => {
      const message = result?.data?.toastQueue;
      if (message) {
        await popToast(message);
      }
      await applyAction(result);
      if (result.status === 200) goto('/dashboard');
    };
  };

  $: if (form?.errors) {
    Object.keys(form).map((message) => {
      if (message === 'errors') return;
      if (form[message]) popToast(message);
    });
  }

  export let form;
  export let snapshotData = {
    email: ''
  };
  let password = '';
  let cpassword = '';
  let preventSubmit = true;

  const emailEvaluator = (e) => {
    warningInfos[0] = {
      ...warningInfos[0],
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER'
    };
    if (snapshotData.email.length < 1) return;

    const emailFormat = () => {
      return snapshotData.email.match(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      );
    };

    if (!emailFormat())
      return (warningInfos[0] = {
        ...warningInfos[0],
        override: true,
        overrideMessage: $t('lang.invalidEmailFormatException')
      });
    evalatePreventSubmit();
  };

  const passwordEvaluator = (e) => {
    warningInfos[1] = {
      ...warningInfos[1],
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER'
    };
    if (password.length < 1) return;

    const complexity = () => {
      return !(
        password.match(/[a-z]/g) &&
        password.match(/[A-Z]/g) &&
        password.match(/[0-9]/g) &&
        password.length > 4
      );
    };

    if (complexity())
      return (warningInfos[1] = {
        ...warningInfos[1],
        override: true,
        overrideMessage: $t('lang.passwordComplexityException')
      });

    cpasswordEvaluator();
    evalatePreventSubmit();
  };
  const cpasswordEvaluator = (e) => {
    warningInfos[2] = {
      ...warningInfos[2],
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER'
    };
    if (cpassword.length < 1) return;

    if (password !== cpassword)
      warningInfos[2] = {
        ...warningInfos[2],
        override: true,
        overrideMessage: $t('lang.passwordMismatchException')
      };
    evalatePreventSubmit();
  };

  const warningInfos = [
    {
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER',
      tag: 'emailInUseException',
      message: $t('lang.emailInUseException')
    },
    {
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER',
      tag: 'passwordComplexityException',
      message: $t('lang.passwordComplexityException')
    },
    {
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER',
      tag: 'passwordMismatchException',
      message: $t('lang.passwordMismatchException')
    }
  ];

  const evalatePreventSubmit = () => {
    preventSubmit =
      warningInfos.some((warningInfo) => {
        return warningInfo.override;
      }) ||
      email.length < 1 ||
      password.length < 1 ||
      cpassword.length < 1;
  };
</script>

<form
  use:enhance={enhanceHandler}
  class="flex flex-col gap-2 p-4 card"
  action="/api/auth?/register"
  method="POST"
>
  <label class="p-2">
    {$t('lang.email')}
    <FormValidatorUtils {form} warningInfo={warningInfos[0]}>
      <input
        class="input"
        type="email"
        id="email"
        name="email"
        autocomplete="username"
        required
        bind:value={snapshotData.email}
        on:input={emailEvaluator}
      />
    </FormValidatorUtils>
  </label>

  <label class="p-2">
    {$t('lang.password')}
    <FormValidatorUtils {form} warningInfo={warningInfos[1]}>
      <input
        class="input"
        type="password"
        id="password"
        name="password"
        autocomplete="new-password"
        bind:value={password}
        on:input={passwordEvaluator}
        required
      />
    </FormValidatorUtils>
  </label>

  <label class="p-2">
    {$t('lang.cpassword')}
    <FormValidatorUtils {form} warningInfo={warningInfos[2]}>
      <input
        class="input"
        type="password"
        id="cpassword"
        name="cpassword"
        autocomplete="new-password"
        bind:value={cpassword}
        on:input={cpasswordEvaluator}
        required
      />
    </FormValidatorUtils>
  </label>

  <button class="btn variant-filled-primary" type="submit"
    >{$t('lang.register')}
  </button>
</form>
