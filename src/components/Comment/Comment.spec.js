import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import Comment from './Comment'
import styles from './styles.module.css'

describe('<Comment />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Comment author="test" text="some text" />);
  });

  it('has an author', () => {
    expect(wrapper.find('h2').first())
        .to.equal('test');
  });

  it('isn\'t empty', () => {
      expect(wrapper.find('span').first().text())
        .to.equal('some text');
  });

});