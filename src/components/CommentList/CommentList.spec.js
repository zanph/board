import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import CommentList from './CommentList'
import styles from './styles.module.css'

describe('<CommentList />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CommentList />)
  });

  //at some point this will be a more fleshed out header component
  it('has a heading', () => {
    expect(wrapper.find('h2').first().text())
        .to.exist;
  });
})