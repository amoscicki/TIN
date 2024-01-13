<script>
  import { t } from '$lib/translations';
  export let data;
  let materials = [];

  Promise.resolve(data.owned).then((owned) => {
    materials = owned;
  });
</script>

<h2 class="h2">{$t('lang.stats')}</h2>
<table
  class="table [&_td]:border-x [&_th]:border-x last:[&_td]:border-x-0 last:[&_th]:border-x-0 first:[&_td]:border-x-0 first:[&_th]:border-x-0"
>
  <thead>
    <tr>
      <th>{$t('lang.material')}</th>
      <th>{$t('lang.tspent')}</th>
      <th>{$t('lang.tsWeek')}</th>
      <th>{$t('lang.tsMonth')}</th>
      <th>{$t('lang.tsYear')}</th>
      <th>{$t('lang.noh')}</th>
    </tr>
  </thead>
  <tbody>
    {#if materials.length === 0}
      <tr>
        <td colspan="6" class="text-center">{$t('lang.noData')}</td>
      </tr>
    {/if}
    {#each materials as material}
      <tr>
        <td>{material?.title}</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>0h 0m</td>
        <td>{material?.hits ?? 0}</td>
      </tr>
    {/each}
  </tbody>
</table>
