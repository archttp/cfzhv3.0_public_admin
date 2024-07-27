<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 异常放行排行(本月) </template>
      <!-- <template #extra>
        <a-link>{{ $t('workplace.viewMore') }}</a-link>
      </template> -->
      <a-table
        :data="tableData"
        :pagination="false"
        :bordered="false"
        style="margin-bottom: 20px"
        :scroll="{ x: '100%', y: '350px' }"
      >
        <template #columns>
          <a-row>
            <a-col :flex="8">
              <a-table-column title="停车场名称" data-index="title">
              </a-table-column>
            </a-col>
            <a-col :flex="4">
              <a-table-column
                title="放行次数"
                data-index="parkingAbnormalReleaseCounts"
              >
              </a-table-column>
            </a-col>
          </a-row>

          <!-- <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.content')"
            data-index="contentCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column> -->
          <!-- <a-table-column
            :title="$t('dataAnalysis.popularAuthor.column.click')"
            data-index="clickCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column> -->
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import {
    queryPopularAuthor,
    PopularAuthorRes,
    getDailyParkingStatistcsListByQuery,
  } from '@/api/visualization';

  const { loading, setLoading } = useLoading();
  const tableData = ref([]);

  const getMonthStartAndEndTimestamps = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);

    const startTimestamp = startOfMonth.getTime();
    const endTimestamp = endOfMonth.getTime() + 86399000; // 86399000毫秒是一天的总毫秒数减去10毫秒，以保证时间为23:59:59.99

    return {
      startOfMonth: startTimestamp,
      endOfMonth: endTimestamp,
    };
  };

  const fetchData = async () => {
    const timestamps = getMonthStartAndEndTimestamps();
    try {
      setLoading(true);
      const { data } = await getDailyParkingStatistcsListByQuery({
        params: {
          page: 1,
          size: 200,
          minStartTime: timestamps.startOfMonth,
          maxEndTime: timestamps.endOfMonth + 999,
          orderByDesc: 'parking_abnormal_release_counts',
          date: 0,
          statisticalModel: 'statistical_model_sum_month'
        },
      });
      console.log(data, 8585);

      tableData.value = data;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };
  fetchData();
</script>

<style scoped lang="less">
  .general-card {
    max-height: 425px;
  }
</style>
