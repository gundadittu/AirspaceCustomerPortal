import React from 'react';
import { connect } from 'react-redux';

// import * as actionCreator from '../../store/actions/officeAdmin';
import * as generalActionCreator from '../../store/actions/general';
import * as actionCreator from '../../store/actions/officeAdmin';
// import * as officeActionCreator from '../../store/actions/officeAdmin';
// import InvoiceCard from './InvoiceCard';
// import RefreshIcon from '@material-ui/icons/Refresh';
// import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router-dom';
import { Row, Col, Menu, List, Card, Button, Tooltip, Modal, message, Steps, Popconfirm } from 'antd';
import * as pageTitles from '../../pages/pageTitles';
import getPagePayload from '../../pages/pageRoutingFunctions';

import CoffeeImage from "../../assets/images/services/coffee.jpeg";
import ColdBrewImage from "../../assets/images/services/cold-brew.jpeg";
import SnacksImage from "../../assets/images/services/snacks.jpeg";
import AlcoholImage from "../../assets/images/services/alcohol.jpeg";
import FurnitureImage from "../../assets/images/services/furniture.jpg";
import ArchitectureImg from "../../assets/images/services/architecture.jpeg";
import ConferenceRoomImg from "../../assets/images/services/conference-room.jpeg";
import InternetImg from "../../assets/images/services/internet.jpeg";
import SuppliesImg from "../../assets/images/services/supplies.jpeg";
import WhiteboardImg from "../../assets/images/services/whiteboard.jpg";
import Accoustics from "../../assets/images/services/accoustics.jpg";
import Branding from "../../assets/images/services/branding.jpg";
import Moving from "../../assets/images/services/moving.jpeg";
import Plants from "../../assets/images/services/plants.jpeg";
import Postal from "../../assets/images/services/postal.jpeg";
import Security from "../../assets/images/services/security.jpeg";
import SpacePlanning from "../../assets/images/services/space-planning.jpeg";
import Hazardous from "../../assets/images/services/hazardous.jpg";
import DeepClean from "../../assets/images/services/deep-cleaning.jpg";
import Windows from "../../assets/images/services/windows.jpeg";
import Floors from "../../assets/images/services/floors.jpeg";
import Lights from "../../assets/images/services/lights.jpeg";
import Restroom from "../../assets/images/services/restroom.jpeg";
import HVAC from "../../assets/images/services/hvac.jpg";
import Electric from "../../assets/images/services/electric.jpeg";
import Plumbing from "../../assets/images/services/plumbing.jpeg";
import Catering from "../../assets/images/services/catering.jpg";
import Events from "../../assets/images/services/events.jpeg";
import Mounting from "../../assets/images/services/mounting.jpg";
import OngoingCleaning from "../../assets/images/services/ongoing-cleaning.jpeg";
import Printing from "../../assets/images/services/printing.jpg";
import Upholstery from "../../assets/images/services/upholestery.jpeg";
import IT from "../../assets/images/services/it-services.jpeg";
import WasteRemoval from "../../assets/images/services/waste-removal.jpeg";
import PestControl from "../../assets/images/services/pest-control.jpg";
import FloorMat from "../../assets/images/services/floor-mat.jpeg";
import CleaningSupplies from "../../assets/images/services/cleaning-supplies.jpg";

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';

import OrderForm from "../OrderFormComp/OrderForm";

// import Other from "../../assets/images/services/other.jpeg";

const { Meta } = Card;

class FindServicesPage extends React.Component {

    state = {
        dataSource: "food-drink",
        showDescription: false,
        descriptionTitle: null,
        descriptionText: null,
        showSteps: false
    }

    handleRoute() {
        if (this.props.match.isExact) {
            const selectedOfficeUID = this.props.match.params.officeUID;

            const list = this.props.userAdminOfficeList;
            let officeObj = null;
            for (let key in list) {
                const value = list[key];

                if (value.uid === selectedOfficeUID) {
                    officeObj = value;
                }
            }

            const pagePayload = getPagePayload(pageTitles.homePageOfficeAdmin, { officeUID: selectedOfficeUID, officeObj: officeObj });
            if (pagePayload) {
                this.props.changePage(pagePayload);
            }
            const secondPagePayload = getPagePayload(pageTitles.findServicesPageOfficeAdmin);
            if (secondPagePayload) {
                this.props.changePage(secondPagePayload);
            }

            this.props.getServicePlan(selectedOfficeUID);
            this.props.loadEMInfo({ selectedOfficeUID: selectedOfficeUID });
            this.props.getServicePlan(selectedOfficeUID);
            this.props.loadInvoices(selectedOfficeUID);
            this.props.loadUserList(selectedOfficeUID);
        }
    }

    handleClick(e) {
        var key = e.key;
        this.setState({ dataSource: key });
    }

    getDataSource() {
        let data = [];
        if (this.state.dataSource === "food-drink") {
            data = [
                {
                    image: CoffeeImage,
                    title: "Coffee + Tea",
                    description: "We bring you the most iconic local brands to service all your fresh coffee, tea, and cold brew needs. Request to find out what coffee we can bring to your office."
                },
                {
                    image: SnacksImage,
                    title: "Snacks + Beverages",
                    description: "From healthy to premium, to guilty pleasures, we can bring your favorite drinks and snacks right to your office and keep it organized. Relax and enjoy your favorite bars and sparkling waters."
                },
                {
                    image: ColdBrewImage,
                    title: "Cold Brew",
                    description: "Like cold brew? So do we, find out which local providers can service your office."
                },
                {
                    image: AlcoholImage,
                    title: "Beer + Spirits + Wine",
                    description: "We take pride in serving your office with local craft beers. International and domestic? Yeah, we got that too. Find out more about how our vendors can service your office with an assortment of beers, spirits, and wines."
                }
            ];
        } else if (this.state.dataSource === "it-services") {
            data = [
                {
                    image: InternetImg,
                    title: "Internet",
                    description: "Diagnose slow internet speeds, spotty connections, and regular outages in your office. We'll get you up to speed in no time."
                },
                {
                    image: ConferenceRoomImg,
                    title: "Conference Rooms",
                    description: "From hardware to software, Airspace can power your conference rooms with technology that works and is easy to use...at a fraction of the cost."
                },
                {
                    image: Mounting,
                    title: "Television Mounting",
                    description: "Have TVs and computer monitors mounted in conference rooms or by team seating to maximize visibility for conference calls, meetings, or dashboard reporting."
                },
                {
                    image: Printing,
                    title: "Printing",
                    description: "Avoid the headache of finding the right print solution for you office, let us match you with a print solution that works."
                },
                {
                    image: IT,
                    title: "IT Services",
                    description: "Maximize business efficiency by working with an Airspace professional IT firm. We can cover all of your ongoing IT needs. Examples include: help desk support, managing software licenses and hardware purchases, setting up new devices, handling connectivity issues, and proactively providing insights and advice to improve your workspace productivity based on specific business needs."
                }
            ];
        } else if (this.state.dataSource === "space-management") {
            data = [
                {
                    image: FurnitureImage,
                    title: "Furniture",
                    description: "Take the hassle out of furniture, we offer purchase, lease, and rental options, and include assembly, installation, and replacements."
                },
                // {
                //     title: "Office App",
                //     description: "Stop paying for unnecessary add-ons. Our App provides the functions you need: space & desk reservation, guest registration, service requests, space info, and plan events."
                // },
                // {
                //     title: "Space Analytics + Growth Planning",
                //     description: "Learn if you're using your space to its fullest potential. Airspace can help you through your expansion needs."
                // },
                {
                    image: SpacePlanning,
                    title: "Space Planning & Design",
                    description: "Redesign your office space to reflect your brand and company culture with custom interior design services. Create a work environment that accommodates the needs of your team by designing a successful, efficient office space."
                },
                {
                    image: ArchitectureImg,
                    title: "Architecture + General Contracting",
                    description: "Not sure where to begin on your next big project? Let us guide you."
                }
            ];
        } else if (this.state.dataSource === "office-help") {
            data = [
                {
                    image: SuppliesImg,
                    title: "Office Supplies",
                    description: "We have all your office needs covered, reach out to find out how we can stock your office."
                },
                {
                    image: WhiteboardImg,
                    title: "Whiteboards + Mounting",
                    description: "Save space by mounting whiteboards in conference rooms and common spaces to enable easy collaboration and brainstorming. Can also provide the whiteboards. "
                },
                {
                    image: Plants,
                    title: "Plants",
                    description: "Plants are great for decorating office space––they literally breathe life into the air. If you don't have a green thumb, it can be hard to know which plants are best for your space and will thrive in your office environment. Set up a free consultation to help determine which high quality, nursery-grown plants would be best to install in your office. Inquire separately for weekly plant care services. And yes, we can hang and care for them too."
                },
                {
                    image: Branding,
                    title: "Signs & Branding",
                    description: "Add signage to your office space and reception area to ensure your brand is well represented. Get help mounting custom wood, metal, plastic, or LED signage to make a great first impression."
                },
                {
                    image: Accoustics,
                    title: "Acoustic Panels",
                    description: "Soundproof conference rooms and common areas of your office to prevent sound from traveling from meetings, team lunches, or neighboring tenants and keep work areas distraction-free."
                },
                {
                    image: Moving,
                    title: "Moving Service",
                    description: "Office relocations consist of a lot of moving pieces. Have your office furniture, appliances, supplies, and personal items packed up and prepared for transport with professional moving services. Once your belongings have reached your new office space, the team can help you prep the space and unpack, reassemble, and organize your items in your new office."
                },
                {
                    image: Security,
                    title: "Office Security",
                    description: "We cover everything from integrated security installation, system repair, locksmith services, access control, surveillance systems, guard services, and general consultation."
                }
            ];
        } else if (this.state.dataSource === "cleaning") {
            data = [
                {
                    image: OngoingCleaning,
                    title: "Ongoing Cleaning",
                    description: "With any shared space, dust and dirt can accumulate quickly. Based on your office size and needs, you can schedule evening cleaning to ensure a clean office each morning."
                },
                {
                    image: DeepClean,
                    title: "Deep Cleaning",
                    description: "Whether you are moving out or just need to press reset on your office space, this intensive cleaning session sanitizes your office and removes dust and dirt from out-of-reach places like under heavy furniture or hard to clean areas like moulding. Deep cleaning creates a healthier work environment for teams."
                },
                {
                    image: Floors,
                    title: "Floors",
                    description: "From carpets, to buffing, to tile and grout, we have all your floor cleaning needs covered."
                },
                {
                    image: FloorMat,
                    title: "Floor Mat Service",
                    description: "Commercial floor mat service program protects your floors and the people that walk on them. Service includes laundering, pick-up and delivery."
                },
                {
                    image: Windows,
                    title: "Windows",
                    description: "Between the weather and living in a city, dirt and debris can build up on your windows, compromising your natural light. Regular window washing can remove stains and keep your office bright."
                },
                {
                    image: Upholstery,
                    title: "Upholstery",
                    description: "It's easy for stains to accumulate with so many people in your office each day. Regular furniture cleaning can remove small or large stains and keep your office looking presentable for your team and visitors."
                },
                {
                    image: WasteRemoval,
                    title: "Waste Removal",
                    description: "It's always surprising how much trash an office creates. Take trash collection and removal out of your job description by setting up daily or weekly hauling to properly dispose of your trash and recycling to adhere to city and building requirements and avoid fines. Need to get rid of heavy trash items? We cover that too."
                },
                {
                    image: Hazardous,
                    title: "Hazardous Materials",
                    description: "Keep your office safe and have mildew and black mold in bathrooms, kitchens, around windows, or behind walls professionally removed. Our environmental experts can diagnose your mold type and other environmental waste, its severity, and make recommendations about remediation methods. Proper containment and removal will ensure your air quality is safe for your team and your physical space does not experience any wood rot or further damage."
                },
                {
                    image: PestControl,
                    title: "Pest Control",
                    description: "Whether you've spotted unwanted visitors in your office or want to prevent pests from finding their way inside, professional pest control services can exterminate rodents and insects and protect your space from future infestation. Regularly scheduled inspections and preventative treatments can also help keep your office pest-free and sanitary."
                },
                {
                    image: CleaningSupplies,
                    title: "Cleaning + Maintenance Supplies",
                    description: "Janitorial supplies are essential for businesses of all sizes. Having janitorial cleaning supplies, sprays, paper towels and hygiene products on hand ensures that custodians are ready for any spills or situations they encounter. Office cleaning supplies range from industrial-strength cleansers and sprays to basic restroom items like soap and hand sanitizer."
                }
            ]
        } else if (this.state.dataSource === "repairs-maintenance") {
            data = [
                {
                    image: Restroom,
                    title: "Restrooms",
                    description: "From toilets, to sinks to leaks, we've got your restroom needs covered."
                },
                {
                    image: Lights,
                    title: "Lights",
                    description: "We cover fixtures, installation, switches, and everything in between."
                },
                {
                    image: HVAC,
                    title: "HVAC",
                    description: "We service your HVAC needs to keep your team cool and comfortable."
                },
                {
                    image: Electric,
                    title: "General Electric",
                    description: "Electrical issues like faulty wiring or a blown fuse can harm productivity. Buildings sometimes aren't wired to accommodate the size of your team, so having an electrician take a look at your setup will ensure quick and safe repairs."
                },
                {
                    image: Plumbing,
                    title: "General Plumbing",
                    description: "Plumbing problems can wreak havoc on your space. Let our experts respond to these issues or provide proactive solutions."
                },
                // {
                //     image: Other,
                //     title: "Other",
                //     description: "Can't find what you're looking for? Your experience manager can work with you to find a solution."
                // },
            ];
        } else if (this.state.dataSource === "office-moving") {
            data = [
                {
                    image: Moving,
                    title: "Moving Service",
                    description: "Office relocations consist of a lot of moving pieces. Have your office furniture, appliances, supplies, and personal items packed up and prepared for transport with professional moving services. Once your belongings have reached your new office space, the team can help you prep the space and unpack, reassemble, and organize your items in your new office."
                },
                {
                    image: FurnitureImage,
                    title: "Furniture",
                    description: "Take the hassle out of furniture, we offer purchase, lease, and rental options, and include assembly, installation, and replacements."
                },
                {
                    image: DeepClean,
                    title: "Deep Cleaning",
                    description: "Whether you are moving out or just need to press reset on your office space, this intensive cleaning session sanitizes your office and removes dust and dirt from out-of-reach places like under heavy furniture or hard to clean areas like moulding. Deep cleaning creates a healthier work environment for teams."
                },
                {
                    image: WasteRemoval,
                    title: "Waste Removal",
                    description: "It's always surprising how much trash an office creates. Take trash collection and removal out of your job description by setting up daily or weekly hauling to properly dispose of your trash and recycling to adhere to city and building requirements and avoid fines. Need to get rid of heavy trash items? We cover that too."
                },
                {
                    image: ArchitectureImg,
                    title: "Architecture + General Contracting",
                    description: "Not sure where to begin on your next big project? Let us guide you."
                },
                {
                    image: SpacePlanning,
                    title: "Space Planning & Design",
                    description: "Redesign your office space to reflect your brand and company culture with custom interior design services. Create a work environment that accommodates the needs of your team by designing a successful, efficient office space."
                }
            ];
        } else if (this.state.dataSource === "events-catering") {
            data = [
                {
                    image: Events,
                    title: "Event Planning",
                    description: "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
                },
                {
                    image: Catering,
                    title: "Catering",
                    description: "From Tuesday Cold Brews to office happy hours, to the yearly Christmas party, let Airspace take the hassle out of having fun."
                }
            ]
        }
        return data;
    }

    hideDescription() {
        this.setState({ showDescription: false, descriptionText: null, descriptionText: null });
    }

    showDetails(item) {
        const title = item.title;
        const description = item.description;
        this.setState({ showDescription: true, descriptionTitle: title, descriptionText: description });
    }

    hideSteps() {
        this.setState({ showSteps: false });
    }

    showSteps() {
        this.setState({ showSteps: true, showDescription: false });
    }

    requestService(type, description, onlyInterested) {
        message.success('Sent your request to your experience manager.');
        let dict = {
            selectedOfficeUID: this.props.currentOfficeUID,
            serviceType: type,
            serviceDescription: description,
            onlyInterested: onlyInterested
        };
        this.props.addRequestForService(dict);
    }

    render() {
        this.handleRoute();

        let data = this.getDataSource();
        const Step = Steps.Step;



        return (
            <div>
                <Modal
                    visible={this.state.showSteps}
                    title={"How it Works"}
                    onOk={this.hideSteps.bind(this)}
                    onCancel={this.hideSteps.bind(this)}
                    width={1000}
                    footer={[<Button onClick={this.hideSteps.bind(this)} type="primary">Ok</Button>]}
                >
                    <div style={{ paddingTop: 40, paddingBottom: 40 }}>
                        <Steps progressDot current={3}>
                            <Step title="Request" description="Answer a few quick questions." />
                            <Step title="Wait for it..." description="Your Experience Manager does their magic. This usually takes 24-40 hours." />
                            <Step title="Choose an Option" description="Your Experience Manager provides personalized options to add to your service plan." />
                        </Steps>
                    </div>
                </Modal>
                {/* <Modal
                    visible={this.state.showDescription}
                    title={(<h3>{this.state.descriptionTitle}</h3>)}
                    onOk={this.hideDescription.bind(this)}
                    onCancel={this.hideDescription.bind(this)}
                    footer={[
                        // (<Tooltip title="We'll answer your questions and even give you a quote. No commitment required."> <Button onClick={() => this.requestService(this.state.descriptionTitle, "", true)} type="secondary">I'm Interested</Button></Tooltip>),
                        (<Popconfirm icon={null} title={null} okText="Confirm" cancelText="Never mind" onConfirm={() => this.requestService(this.state.descriptionTitle, "", true)}>
                            <Tooltip placement="bottom" title="Your experience manager will reach out with pricing and terms to help add this to your service plan.">
                                <Button type="primary">I'm Interested</Button>
                            </Tooltip>
                        </Popconfirm>)
                    ]}
                >
                    <p>{this.state.descriptionText}</p>
                </Modal> */}
                
                <OrderForm visible={this.state.showDescription} onCancel={this.hideDescription.bind(this)} serviceTitle={this.state.descriptionTitle} topText={this.state.descriptionText} />

                <Row>
                    <Col className="wide-table" span={24}>
                        <h1>Find Services
                        <IconButton className="inlineDisplay" style={{ marginBottom: 5 }} onClick={this.showSteps.bind(this)}>
                                <InfoIcon />
                            </IconButton>
                        </h1>

                        <div>
                            <Row type="flex">
                                <Col span={12}>
                                    <Row type="flex" style={{ height: 87 }} align="middle" justify="start">
                                        <Menu
                                            className="inlineDisplay menu-tab"
                                            style={{ border: 0 }}
                                            onClick={this.handleClick.bind(this)}
                                            defaultSelectedKeys={[this.state.dataSource]}
                                            mode="horizontal"
                                        >
                                            <Menu.Item key="food-drink">
                                                Food + Drink
                                    </Menu.Item>
                                            <Menu.Item key="it-services">
                                                IT Services
                                    </Menu.Item>
                                            <Menu.Item key="space-management">
                                                Space Management
                                    </Menu.Item>
                                            <Menu.Item key="office-help">
                                                Office Help
                                    </Menu.Item>
                                            <Menu.Item key="cleaning">
                                                Cleaning
                                    </Menu.Item>
                                            <Menu.Item key="repairs-maintenance">
                                                Repairs + Maintenance
                                    </Menu.Item>
                                            <Menu.Item key="office-moving">
                                                Office Moving
                                    </Menu.Item>
                                            <Menu.Item key="events-catering">
                                                Events + Catering
                                    </Menu.Item>
                                        </Menu>
                                    </Row>
                                </Col>
                            </Row>
                            {/* <a onClick={() => this.showDetails(item)}></a> */}
                            {data != null ?
                                (
                                    <List
                                        grid={{
                                            gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3,
                                        }}
                                        dataSource={data}
                                        renderItem={item => (
                                            <List.Item style={{ paddingTop: 0 }}>
                                                <Card
                                                    style={{ width: "85%" }}
                                                    cover={<img style={{ cursor: "pointer" }} onClick={() => this.showDetails(item)} alt="example" src={item.image} />}
                                                    actions={[(<Button onClick={() => this.showDetails(item)} type="primary">Request</Button>)]}
                                                >

                                                    {/* (<Button onClick={() => this.showDetails(item)} type="secondary">Learn More</Button>), (<Popconfirm icon={null} title={null} okText="Confirm" cancelText="Never mind" onConfirm={() => this.requestService(item.title, "", true)}>
                                                        <Tooltip placement="bottom" title="Your experience manager will reach out with pricing and terms to help add this to your service plan.">
                                                            <Button type="primary">I'm Interested</Button>
                                                        </Tooltip>
                                                    </Popconfirm>) */}
                                                    <a onClick={() => this.showDetails(item)}>
                                                        <Meta
                                                            title={item.title}
                                                        // description={"Starting at $19.99/lb"}
                                                        />
                                                    </a>
                                                </Card>
                                            </List.Item>
                                        )}
                                    />
                                )
                                : null}
                        </div>
                    </Col>
                </Row>
                <Row style={{ paddingTop: 50, paddingBottom: 50 }}>
                    <Col style={{ textAlign: "center" }} span={24}>
                        <h3 style={{ fontWeight: 4 }}>Don’t see a service you want? <a onClick={() => this.requestService("other", "", false)}>Let your experience manager help you find it.</a></h3>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userAdminOfficeList: state.auth.adminOfficeList,
        currentOfficeUID: state.general.currentOfficeAdminUID
    }
};

const mapDispatchToProps = dispatch => {
    return {
        changePage: (payload) => dispatch(generalActionCreator.changePage(payload)),
        addRequestForService: (payload) => dispatch(generalActionCreator.addRequestForService(payload)),
        getServicePlan: (officeUID) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID })),
        loadEMInfo: (payload) => dispatch(generalActionCreator.getEMInfo(payload)),
        getServicePlan: (officeUID) => dispatch(generalActionCreator.getServicePlan({ selectedOfficeUID: officeUID })),
        loadInvoices: (officeUID) => dispatch(generalActionCreator.getAllInvoices({ selectedOfficeUID: officeUID })),
        loadUserList: (officeUID) => dispatch(actionCreator.loadOfficeUsers(officeUID))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FindServicesPage));
