import React from "react";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import "./styles.css";

const client = new ApolloClient({
  uri: "/graphql"
});

class App extends React.Component {
  onLogoutClick = async () => {
    await fetch(`/logout`, { method: "post" });
    window.location.reload();
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <Query
          query={gql`
            {
              viewer {
                user {
                  username
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <div className={"app-container"}>Loading...</div>;
            }

            let content;
            if (data && data.viewer) {
              content = (
                <React.Fragment>
                  <span>
                    You are signed in as{" "}
                    <strong>{data.viewer.user.username}</strong>!
                  </span>
                  <button
                    onClick={this.onLogoutClick}
                    className={"btn-primary"}
                  >
                    Log out
                  </button>
                </React.Fragment>
              );
            } else {
              content = (
                <a href="/authorize" className={"btn-primary"}>
                  Log in with Product Hunt
                </a>
              );
            }

            return <div className={"app-container"}>{content}</div>;
          }}
        </Query>
      </ApolloProvider>
    );
  }
}

export default App;
