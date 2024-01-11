<script>
  import { FormValidatorUtils } from '$lib';
  import { enhance, applyAction } from '$app/forms';
  export let form;
  export let snapshotData = {
    email: ''
  };

  let preventSubmit = true;

  const passwordEvaluator = (e) => {
    warningInfos[1] = {
      ...warningInfos[1],
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER'
    };
    if (password.length < 1) return;

    if (password.length < 5)
      return (warningInfos[1] = {
        ...warningInfos[1],
        override: true,
        overrideMessage: 'passwordComplexityException'
      });
    evalatePreventSubmit();
  };

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
        overrideMessage: 'invalidEmailFormatException'
      });
    evalatePreventSubmit();
  };

  const warningInfos = [
    {
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER',
      tag: 'invalidEmailFormatException',
      message: 'invalidEmailFormatException'
    },
    {
      override: false,
      overrideMessage: 'CLIENTSIDE_VALIDATION_ERROR_PLACEHOLDER',
      tag: 'invalidCredentialsException',
      message: 'invalidCredentialsException'
    }
  ];
  const enhanceHandler = () => {
    if (preventSubmit) cancel();
    return async ({ result }) => {
      await applyAction(result);
    };
  };

  const evalatePreventSubmit = () => {
    preventSubmit =
      warningInfos.some((warningInfo) => {
        return warningInfo.override;
      }) ||
      email.length < 1 ||
      password.length < 1;
  };
</script>

<FormValidatorUtils {form} toaster={true} />

<form
  use:enhance={enhanceHandler}
  class="flex flex-col gap-2 p-4 card"
  action="/api/auth?/login"
  method="POST"
>
  <label class="p-2">
    Email
    <FormValidatorUtils toaster={false} {form} warningInfo={warningInfos[0]}>
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
    Password
    <FormValidatorUtils toaster={false} {form} warningInfo={warningInfos[1]}>
      <input
        class="input"
        type="password"
        id="password"
        name="password"
        autocomplete="current-password"
        on:input={passwordEvaluator}
        required
      />
    </FormValidatorUtils>
  </label>

  <button class="btn variant-filled-primary" type="submit">Login</button>
</form>
