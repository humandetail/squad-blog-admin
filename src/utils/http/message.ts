import { message } from 'ant-design-vue';

message.config({
  top: '50px',
  duration: 3,
  maxCount: 3
});

export const success = (content: string, duration = 3, key: string | number = '') => {
  return message.open({
    type: 'success',
    content,
    duration,
    key
  });
}

export const warning = (content: string, duration = 3, key: string | number = '') => {
  return message.open({
    type: 'warning',
    content,
    duration,
    key
  });
}

export const error = (content: string, duration = 3, key: string | number = '') => {
  return message.open({
    type: 'error',
    content,
    duration,
    key
  });
}

export const info = (content: string, duration = 3, key: string | number = '') => {
  return message.open({
    type: 'info',
    content,
    duration,
    key
  });
}

export const loading = (content: string, duration = 3, key: string | number = '') => {
  return message.open({
    type: 'loading',
    content,
    duration,
    key
  });
}
