<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.retentionTrends')"
          quota="parking"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.userRetention')"
          quota="charging_station"
          chart-type="bar"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.contentConsumptionTrends')"
          quota="community"
          chart-type="line"
        />
      </a-col>
      <a-col :span="6">
        <ChainItem
          :title="$t('multiDAnalysis.card.title.contentConsumption')"
          quota="device"
          chart-type="bar"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import ChainItem from './chain-item.vue';
</script>
