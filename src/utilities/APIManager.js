import Settings from "./UrlLink"

export default Object.create(null, {
    GET: {
        value: function (id) {
            return fetch(`${Settings.url}/${this.DBname}/${id}`)
                .then(r => r.json())
        }
    },
    GETALL: {
        value: function () {
            return fetch(`${Settings.url}/${this.DBname}`)
                .then(r => r.json())
        }
    },
    DELETE: {
        value: function (id) {
            return fetch(`${Settings.url}/${this.DBname}/${id}`,
                {
                    method: "DELETE"
                })
        }
    },
    POST: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.DBname}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.json())
        }
    },
    PUT: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.DBname}/${obj.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.json());
        }
    },
    PATCH: {
        value: function (obj) {
            return fetch(`${Settings.url}/${this.DBname}/${obj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            }).then(data => data.json());
        }
    }
})