import { createPicture } from '@/services';
import { Uploader } from '@milkdown/plugin-upload';
import { message } from 'ant-design-vue';
import type { Node } from 'prosemirror-model';

const uploader: Uploader = async (files, schema) => {
  return [];
  // const images: File[] = [];

  // for (let i = 0; i < files.length; i++) {
  //   const file = files.item(i);
  //   if (!file) {
  //     continue;
  //   }

  //   // You can handle whatever the file type you want, we handle image here.
  //   if (!file.type.includes('image')) {
  //     continue;
  //   }

  //   images.push(file);
  // }

  // const nodes: Node[] = await Promise.all(
  //   images.map(async (image) => {
  //     const res = await createPicture({
  //       file: image,
  //       name: image.name,
  //       categoryId: 1
  //     });
  //     if (res.code !== 200) {
  //       message.error('图片上传失败！');
  //       return schema.nodes.image.createAndFill({
  //         src: '',
  //         alt: 'uploade failed'
  //       }) as Node;
  //     }
  //     const alt = image.name;
  //     return schema.nodes.image.createAndFill({
  //       src: `${res.data.qiniuDomain}${res.data.qiniuKey}`,
  //       alt: res.data.name
  //     }) as Node;
  //   })
  // );

  // return [nodes];
};

export default uploader;
