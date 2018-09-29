// const phoneNumber = {
//   'row': '4',
//   'col': '4',
//   'KeyList': [
//     [
//       { 'key': '1', 'row': '0', 'col': '0', 'colspan': '2' },
//       { 'key': '2', 'row': '0', 'col': '2', 'colspan': '2' },
//       { 'key': '3', 'row': '0', 'col': '4', 'colspan': '2' },
//       { 'key': '{backspace}', 'row': '0', 'col': '6', 'colspan': '2' }
//     ],
//     [
//       { 'key': '4', 'row': '1', 'col': '0', 'colspan': '2' },
//       { 'key': '5', 'row': '1', 'col': '2', 'colspan': '2' },
//       { 'key': '6', 'row': '1', 'col': '4', 'colspan': '2' },
//       { 'key': '{enter}', 'row': '1', 'col': '6', 'colspan': '2', 'rowspan': '2' }
//     ],
//     [
//       { 'key': '7', 'row': '2', 'col': '0', 'colspan': '2' },
//       { 'key': '8', 'row': '2', 'col': '2', 'colspan': '2' },
//       { 'key': '9', 'row': '2', 'col': '4', 'colspan': '2' }
//     ],
//     [
//       { 'key': '0', 'row': '3', 'col': '0', 'colspan': '4' },
//       { 'key': '-', 'row': '3', 'col': '4', 'colspan': '2' },
//       { 'key': '{close}', 'row': '3', 'col': '6', 'colspan': '2' }
//     ]
//   ]
// };
const phoneNumber = {
  'test1': {
    'row': '4',
    'col': '4',
    'KeyList': [
      [
        { 'key': '1', 'row': '0', 'col': '0', 'colspan': '2' },
        { 'key': '2', 'row': '0', 'col': '2', 'colspan': '2' },
        { 'key': '{shift:Shift=test2}', 'row': '0', 'col': '4', 'colspan': '2' },
        { 'key': '{backspace}', 'row': '0', 'col': '6', 'colspan': '2' }
      ],
      [
        { 'key': '4', 'row': '1', 'col': '0', 'colspan': '2' },
        { 'key': '5', 'row': '1', 'col': '2', 'colspan': '2' },
        { 'key': '6', 'row': '1', 'col': '4', 'colspan': '2' },
        { 'key': '{enter}', 'row': '1', 'col': '6', 'colspan': '2', 'rowspan': '2' }
      ],
      [
        { 'key': '7', 'row': '2', 'col': '0', 'colspan': '2' },
        { 'key': '8', 'row': '2', 'col': '2', 'colspan': '2' },
        { 'key': '9', 'row': '2', 'col': '4', 'colspan': '2' }
      ],
      [
        { 'key': '0', 'row': '3', 'col': '0', 'colspan': '4' },
        { 'key': '-', 'row': '3', 'col': '4', 'colspan': '2' },
        { 'key': '{close}', 'row': '3', 'col': '6', 'colspan': '2' }
      ]
    ]
  },
  "test2": {
    'row': '4',
    'col': '4',
    'KeyList': [
      [
        { 'key': '11', 'row': '0', 'col': '0', 'colspan': '2' },
        { 'key': '22', 'row': '0', 'col': '2', 'colspan': '2' },
        { 'key': '{shift:Shift=test1}', 'row': '0', 'col': '4', 'colspan': '2' },
        { 'key': '{backspace}', 'row': '0', 'col': '6', 'colspan': '2' }
      ],
      [
        { 'key': '4', 'row': '1', 'col': '0', 'colspan': '2' },
        { 'key': '5', 'row': '1', 'col': '2', 'colspan': '2' },
        { 'key': '6', 'row': '1', 'col': '4', 'colspan': '2' },
        { 'key': '{enter}', 'row': '1', 'col': '6', 'colspan': '2', 'rowspan': '2' }
      ],
      [
        { 'key': '7', 'row': '2', 'col': '0', 'colspan': '2' },
        { 'key': '82', 'row': '2', 'col': '2', 'colspan': '2' },
        { 'key': '9', 'row': '2', 'col': '4', 'colspan': '2' }
      ],
      [
        { 'key': '0', 'row': '3', 'col': '0', 'colspan': '4' },
        { 'key': '-', 'row': '3', 'col': '4', 'colspan': '2' },
        { 'key': '{close}', 'row': '3', 'col': '6', 'colspan': '2' }
      ]
    ]
  },
  'InitSet': 'test1'
};
export default phoneNumber;
