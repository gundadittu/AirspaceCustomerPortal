import React from 'react';
import {
  Tag, Input, Tooltip, Icon, message
} from 'antd';

class ServiceEmails extends React.Component {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
  };

  componentDidMount() {
    var emailTags = this.props.emails
    this.setState({
      tags: emailTags
    })
  }

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });

    this.props.updateEmails(this.props.rawType, tags);
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  validateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
     {
       return (true)
     }
       message.error("You have entered an invalid email address!")
       return (false)
   }

   handleTagClickAway = () => {
     let tags = this.state.tags;
     this.setState({
       tags,
       inputVisible: false,
       inputValue: '',
     });
   }


  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;

    const validInput = this.validateEmail(inputValue)
    if (validInput) {
      let tags = state.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }

      var newTags = this.state.tags.splice()
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });

      this.props.updateEmails(this.props.rawType, tags);
    }
  }

  saveInputRef = input => this.input = input

  render() {
    const { /*tags, */inputVisible, inputValue } = this.state;
    var tags = this.props.emails
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={true} afterClose={() => this.handleClose(tag)} color="blue">
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleTagClickAway}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={this.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" />
          </Tag>
        )}
      </div>
    );
  }
}

export default ServiceEmails
