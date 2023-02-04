import React, { useEffect, useState } from "react";
// @ts-ignore
import op1 from "@src/assets/opportunities/opportunity_1.jpg";
// @ts-ignore
import op2 from "@src/assets/opportunities/opportunity_2.jpg";
// @ts-ignore
import op3 from "@src/assets/opportunities/opportunity_3.jpg";
// @ts-ignore
import op4 from "@src/assets/opportunities/opportunity_4.jpg";
import { Opportunity } from "@src/state/stores/opportunity/models";
import {
  deleteOpportunity,
  getOpportunities,
} from "@src/state/stores/opportunity/operations";
import LoadingOpportunity from "@src/views/common/LoadingOpportunity";
import GenericModal from "@src/views/common/GenericModal";
import cloneDeep from "lodash/cloneDeep";
import OpportunityCustomCard from "@src/views/host/opportunities/OpportunityCustomCard";

const OpportunitiesTab: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [batch, setBatch] = useState<Opportunity[]>([]);
  const [opportunityToDelete, setOpportunityToDelete] = useState<Opportunity>();
  const [isActiveDelModal, setIsActiveDelModal] = useState<boolean>(false);

  useEffect(() => {
    getOpportunities(setIsLoading).then((response) => {
      //@ts-ignore
      setBatch(response);
    });
  }, []);

  const loadingOpportunities = () => {
    let array: any[] = [];

    for (let i = 1; i < 22; i++) {
      array.push(
        <div
          key={"loading-row-opp-" + i + 1}
          className={"column is-one-fifth-desktop is-6-tablet"}
        >
          <LoadingOpportunity />
        </div>
      );
    }

    return array;
  };

  useEffect(() => {
    if (opportunityToDelete) {
      setIsActiveDelModal(true);
    }
  }, [opportunityToDelete]);

  const delOpportunity = () => {
    if (opportunityToDelete) {
      deleteOpportunity(opportunityToDelete?.opportunityId).then((response) => {
        let tmp = cloneDeep(batch);
        let idx = tmp.findIndex(
          (value) => value.opportunityId == response.opportunityId
        );
        if (idx > -1) {
          tmp.splice(idx, 1);
          setBatch(tmp);
        }
      });
    }
    setIsActiveDelModal(false);
    setOpportunityToDelete(undefined);
  };

  const onCloseModal = () => {
    setIsActiveDelModal(false);
    setOpportunityToDelete(undefined);
  };

  return (
    <div className="columns is-multiline">
      {isLoading
        ? loadingOpportunities()
        : batch &&
          batch.map((value) => (
            <div
              className={"column is-one-fifth-desktop is-6-tablet"}
              key={value.opportunityId}
            >
              <OpportunityCustomCard
                key={"opportunity-row-" + value.opportunityId}
                img={op1}
                opportunity={value}
                setOpportunityToDelete={setOpportunityToDelete}
              />
            </div>
          ))}
      {isActiveDelModal && (
        <GenericModal
          title={"Delete Opportunity"}
          action={delOpportunity}
          close={onCloseModal}
          bodyMessage={"Are you sure you want to delete this opportunity?"}
        />
      )}
    </div>
  );
};
export default OpportunitiesTab;
