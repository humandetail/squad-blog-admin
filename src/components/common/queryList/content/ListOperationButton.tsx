
import { defineComponent } from 'vue';
import { Button, Popconfirm } from 'ant-design-vue';
import { DynamicIcon } from '@/components/common/icons';

const OperationsButton = defineComponent({
  props: ['text', 'icon', 'type', 'handler', 'record'],

  render () {
    const { text, icon, type, handler, record } = this.$props;
    if (type === 'danger') {
      return (
        <Popconfirm
          title={`确定执行【${text}】操作？`}
          onConfirm={() => handler(record)}
          icon={<DynamicIcon icon="QuestionCircleOutlined" style="color: red"></DynamicIcon>}>
          <Button
            type="link"
            danger>
            { icon && <DynamicIcon icon={icon}></DynamicIcon> }
            {text}
          </Button>
        </Popconfirm>
      );
    }

    if (type === 'success') {
      return (
        <Button
          type="link"
          // @ts-ignore
          success
          onClick={() => handler(record)}>
          { icon && <DynamicIcon icon={icon}></DynamicIcon> }
          {text}
        </Button>
      );
    }

    return (
      <Button
        type="link"
        onClick={() => handler(record)}>
        { icon && <DynamicIcon icon={icon}></DynamicIcon> }
        {text}
      </Button>
    );
  }
});

export default OperationsButton;
