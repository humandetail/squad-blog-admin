// menu 栏 图片按钮自定义

import { commandsCtx, CommandsReady, createCmdKey, MilkdownPlugin, Pre } from '@milkdown/core';

export const CustomInsertImage = createCmdKey();

export const imageBtnTool = (handler: () => void) => {
  const cmd: MilkdownPlugin = (_pre: Pre) => async (ctx) => {
    // wait for command manager ready
    await ctx.wait(CommandsReady);
    const commandManager = ctx.get(commandsCtx);
    commandManager.create(CustomInsertImage, () => {
      return () => {
        handler();
        return true;
      }
    });
  }

  return cmd;
};
