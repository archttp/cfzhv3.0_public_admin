export default function (listQuery: any) {
  const finallyListQuery: any = {};
  for (const key in listQuery) {
    if (listQuery[key]['dataType'] == 'between') {
      if (
        listQuery[key]['betweenValue'][0] != '' &&
        listQuery[key]['betweenValue'][0] !== null &&
        listQuery[key]['betweenValue'][1] !== '' &&
        listQuery[key]['betweenValue'][1] !== null
      ) {
        console.log('进来了0');
        if (
          finallyListQuery[listQuery[key]['field']] == null ||
          typeof finallyListQuery[listQuery[key]['field']] == 'undefined'
        ) {
          finallyListQuery[listQuery[key]['field']] = {
            operator: 'between',
          };
        }
        finallyListQuery[listQuery[key]['field']]['min'] =
          listQuery[key]['betweenValue'][0];
        finallyListQuery[listQuery[key]['field']]['max'] =
          listQuery[key]['betweenValue'][1];
      } else if (
        listQuery[key]['betweenValue'][0] != '' &&
        listQuery[key]['betweenValue'][0] !== null &&
        (listQuery[key]['betweenValue'][1] == '' ||
          listQuery[key]['betweenValue'][1] == null)
      ) {
        finallyListQuery[listQuery[key]['field']] = {
          operator: '>=',
          value: listQuery[key]['betweenValue'][0],
          alias: listQuery[key]['alias'],
          field: listQuery[key]['field'],
        };
      } else if (
        (listQuery[key]['betweenValue'][0] == '' ||
          listQuery[key]['betweenValue'][0] == null) &&
        listQuery[key]['betweenValue'][1] !== '' &&
        listQuery[key]['betweenValue'][1] !== null
      ) {
        finallyListQuery[listQuery[key]['field']] = {
          operator: '<=',
          value: listQuery[key]['betweenValue'][1],
          alias: listQuery[key]['alias'],
          field: listQuery[key]['field'],
        };
      }
    } else if (key == 'limit') {
      finallyListQuery[key] = {
        operator: 'limit',
        page: listQuery[key]['page'],
        limit: listQuery[key]['limit'],
      };
    } else if (key == 'group') {
      finallyListQuery[key] = {
        operator: 'group',
        alias: listQuery[key]['alias'],
        field: listQuery[key]['field'],
      };
    } else if (
      listQuery[key]['operator'] == 'order' &&
      listQuery[key]['value'] != null &&
      listQuery[key]['value'] !== ''
    ) {
      if (
        finallyListQuery[listQuery[key]['operator']] == null ||
        typeof finallyListQuery[listQuery[key]['operator']] == 'undefined'
      ) {
        finallyListQuery[listQuery[key]['operator']] = {
          list: {},
          operator: listQuery[key]['operator'],
        };
      }
      finallyListQuery[listQuery[key]['operator']]['list'][
        listQuery[key]['field']
      ] = {
        type: listQuery[key]['value'],
        alias: listQuery[key]['alias'],
      };
    } else if (
      listQuery[key]['operator'] == 'like' &&
      listQuery[key]['value'] != null &&
      listQuery[key]['value'] !== ''
    ) {
      if (
        finallyListQuery[listQuery[key]['operator']] == null ||
        typeof finallyListQuery[listQuery[key]['operator']] == 'undefined'
      ) {
        finallyListQuery[listQuery[key]['operator']] = {
          list: {},
          operator: listQuery[key]['operator'],
        };
      }
      const likeCollection = finallyListQuery[listQuery[key]['operator']];
      if (
        likeCollection['list'][listQuery[key]['field']] == null ||
        typeof likeCollection['list'][listQuery[key]['field']] == 'undefined'
      ) {
        likeCollection['list'][listQuery[key]['field']] = {};
      }
      const temp = likeCollection['list'][listQuery[key]['field']];
      temp[temp.length] = {
        value: listQuery[key]['value'],
        alias: listQuery[key]['alias'],
      };
    } else if (listQuery[key]['value'] !== '') {
      if (
        listQuery[key]['dataType'] == 'date' &&
        isDate(listQuery[key]['value'])
      ) {
        listQuery[key]['value'] = listQuery[key]['value'].getTime();
      }
      if (
        listQuery[key]['operator'] == '>=' ||
        listQuery[key]['operator'] == '<='
      ) {
        const delimter = listQuery[key]['operator'] == '>=' ? 'min' : 'max';
        if (
          finallyListQuery[listQuery[key]['field']] == null ||
          typeof finallyListQuery[listQuery[key]['field']] == 'undefined'
        ) {
          finallyListQuery[listQuery[key]['field']] = {
            operator: 'between',
          };
        }
        finallyListQuery[listQuery[key]['field']][delimter] =
          listQuery[key]['value'];
      } else if (listQuery[key]['value'] !== null) {
        finallyListQuery[listQuery[key]['field']] = {
          operator: listQuery[key]['operator'],
          value: listQuery[key]['value'],
        };
      }
    }
  }
  return finallyListQuery;
}
