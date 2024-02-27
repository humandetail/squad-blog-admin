import { JSEncrypt } from 'jsencrypt'
import publicKey from '@/config/publicKey'
import { type LocationQuery } from 'vue-router'
import _ from 'lodash'
import { customAlphabet } from 'nanoid'
import type { OperationButtonProps, RecordType, ZeroOrOneType } from '@/types/common'

export const encryptPassword = (plain: string) => {
  const enc = new JSEncrypt()
  enc.setPublicKey(publicKey)
  return enc.encrypt(plain) || plain
}

export const getQueryString = (query: LocationQuery, key: string): string => {
  const item = query[key]
  if (!item) {
    return ''
  }

  if (_.isArray(item)) {
    return item.pop()!
  }

  return item
}

export const getNanoId = (size = 20, alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'): string => {
  const nanoid = customAlphabet(alphabet, size)
  return nanoid()
}

export const showDashes = (value: any) => {
  const valueType = typeof value
  if (
    (valueType === 'number' && !_.isNaN(value)) ||
    (valueType === 'string' && value) ||
    !_.isEmpty(value) ||
    value
  ) {
    return value
  }

  return '-'
}

export const str2UpperCamelCase = (str: string) => {
  const camelCaseStr = _.camelCase(str)

  return camelCaseStr.charAt(0).toUpperCase() + camelCaseStr.slice(1)
}

export const formatTreeData = <T extends RecordType & { children?: T[] }>(
  data: T[],
  id = 'id',
  pId = 'pId',
  defaultPId = 0
) => {
  const cloneData = _.cloneDeep(data)

  return cloneData.filter((parent) => {
    const children = cloneData.filter((child) => {
      return _.get(parent, id) === _.get(child, pId)
    })
    if (children.length > 0) {
      parent.children = children
    }
    return _.get(parent, pId) === defaultPId
  })
}

export const getIsShowOperation = (
  { isShow }: { isShow: ZeroOrOneType } & Record<any, any>,
  callback: () => void
): OperationButtonProps => {
  const op: OperationButtonProps = {
    text: isShow ? '隐藏' : '显示',
    type: isShow ? 'primary' : 'success',
    handler: callback
  }

  return op
}
