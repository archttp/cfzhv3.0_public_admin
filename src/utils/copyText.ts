import useClipboard from 'vue-clipboard3';
import { Message } from '@arco-design/web-vue';
const { toClipboard } = useClipboard();

export const copyText = async (val: any) => {
  try {
    await toClipboard(JSON.stringify(val));
    Message.success(`复制成功！内容：${JSON.stringify(val)}`);
  } catch (e) {
    Message.success(`复制失败！原因：${JSON.stringify(e)}`);
  }
};
