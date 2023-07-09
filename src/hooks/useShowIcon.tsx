/* eslint-disable comma-dangle */

import { useState } from 'react';

interface IToggleState {
  [key: string]: boolean;
}
export const useToggle = (
  init: IToggleState = {},
): [IToggleState, (key: string) => void] => {
  const [state, setState] = useState<IToggleState>(init);

  function toggle(key: string) {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return [state, toggle];
};
