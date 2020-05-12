import React, { useState, useEffect } from "react";
import Axios from "axios";

/** Material UI */
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

/** Components */
import ProjectsList from "./components/ProjectsList";
import ProjectViewer from "./components/ProjectViewer";

/** Services */
import {
  API_PROJECTS_LIST,
  API_PROJECTS,
} from "../../../../helpers/apiUrls.helper";

/** Styles */
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    top: "-80px",
  },
  listTitle: {
    margin: theme.spacing(2),
  },
}));

export default function ContentCard(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [projectSelected, setProjectSelected] = useState(null);

  useEffect(() => {
    let _isMonted = false;
    if (!_isMonted) {
      listProjects();
    }
    return () => {
      _isMonted = true;
    };
  }, []);

  const listProjects = async () => {
    try {
      setIsLoading(true);
      const response = await Axios.get(API_PROJECTS_LIST);
      if (response.status === 200) {
        setProjectList(response.data);
        handleProjectsList(response.data[0].projectId);
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectsList = async (projectId) => {
    try {
      setIsLoading(true);
      const response = await Axios.get(`${API_PROJECTS}/${projectId}`);
      if (response.status === 200) {
        setProjectSelected(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Container fixed>
          <Paper>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                style={{ borderRight: "1px solid rgba(0, 0, 0, 0.12)" }}
              >
                <ProjectsList
                  projects={projectList}
                  selectProject={handleProjectsList}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={9}>
                <ProjectViewer project={projectSelected} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    </React.Fragment>
  );
}
