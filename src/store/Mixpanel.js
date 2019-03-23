import mixpanel from 'mixpanel-browser';
mixpanel.init('4b6f21dc6886a40bf4900783da31064a');

let env_check = process.env.NODE_ENV === 'production';
let actions = {
    identify: (id) => {
        if (env_check) mixpanel.identify(id);
    },
    alias: (id) => {
        if (env_check) mixpanel.alias(id);
    },
    track: (name, props) => {
        if (env_check) mixpanel.track(name, props);
    },
    people: {
        set: (props) => {
            if (env_check) mixpanel.people.set(props);
        },
    },
    set_group: (key, data) => {
        if (env_check) mixpanel.set_group(key, data);
    },
    register: (props) => {
        if (env_check) mixpanel.register(props);
    }
};

export let Mixpanel = actions; 
