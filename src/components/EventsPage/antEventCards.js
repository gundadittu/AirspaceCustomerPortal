import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Icon, Menu, Table, Tag, message, notification,
   Popconfirm, Row, Col, Card, Avatar} from 'antd';
// import Highlighter from 'react-highlight-words';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import * as actionCreator from '../../store/actions/officeAdmin';

const { Meta } = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class AntEventCards extends React.Component {
  state = {
  };

  render() {
    return (
      <div>
      <div style={{ padding: '30px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              bordered={false}
             cover={<img alt="example" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2018-02-20-at-17-24-24-1519147509.jpg?crop=1xw:1xh;center,top&resize=480:*" />}
             actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
            >
             <Meta
               avatar={<Avatar src="https://pbs.twimg.com/profile_images/914894415042433024/1aa8papL.jpg" />}
               title="Airspace General Meeting"
               description="February 23, 2018"
             />
            </Card>
          </Col>
          <Col span={8}>
            <Card
              bordered={false}
              hoverable
              cover={<img alt="example" src="https://www.k1speed.com/wp-content/uploads/2018/10/location-header-mobile.jpg" />}
            >
              <Meta
                avatar={<Avatar src="https://assets.customerthermometer.com/img/ncf_userpic.png" />}
                title="Surillo Offsite: Go Kart"
                description="February 11, 2018"
              />
            </Card>
          </Col>
          <Col span={8}>
          <Card
            hoverable
            cover={<img alt="example" src="https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/startup-spotlight-resize.jpg" />}
          >
            <Meta
              avatar={<Avatar src="data:image/png;base64,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" />}
              title="Pied Piper Sales Team Meeting"
              description="March 14, 2018"
            />
          </Card>
          </Col>
        </Row>
      </div>
      <Card title="Events" bordered={false}>

        <Card.Grid style={gridStyle}
          bordered={false}
          hoverable
          cover={<img alt="example" src="https://coda.newjobs.com/api/imagesproxy/ms/cms/content30/images/startup-spotlight-resize.jpg" />}
        >
          <Meta
            avatar={<Avatar src="data:image/png;base64,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" />}
            title="Pied Piper Sales Team Meeting"
            description="March 14, 2018"
          />
        </Card.Grid>
        <Card.Grid
          style={gridStyle}
          bordered={false}
          hoverable
          cover={<img alt="example" src="https://www.k1speed.com/wp-content/uploads/2018/10/location-header-mobile.jpg" />}
        >
          <Meta
            avatar={<Avatar src="https://assets.customerthermometer.com/img/ncf_userpic.png" />}
            title="Surillo Offsite: Go Kart"
            description="February 11, 2018"
          />
        </Card.Grid>
        <Card.Grid
          style={gridStyle}
          bordered={false}
         cover={<img alt="example" src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2018-02-20-at-17-24-24-1519147509.jpg?crop=1xw:1xh;center,top&resize=480:*" />}
         actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
         <Meta
           avatar={<Avatar src="https://pbs.twimg.com/profile_images/914894415042433024/1aa8papL.jpg" />}
           title="Airspace General Meeting"
           description="February 23, 2018"
         />
        </Card.Grid>
      </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentOfficeUID: state.general.currentOfficeAdminUID,
    isLoadingGuestsData: state.officeAdmin.isLoadingGuestsData
  }
};

export default connect(mapStateToProps, null)(AntEventCards);
