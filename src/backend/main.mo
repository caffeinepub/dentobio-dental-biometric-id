import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type DemoRequest = {
    name : Text;
    email : Text;
    organization : Text;
    message : Text;
  };

  type IdentificationRecord = {
    subjectId : Text;
    matchScore : Nat;
    dentalPatternHash : Text;
    timestamp : Time.Time;
    status : Text;
  };

  module IdentificationRecord {
    public func compare(a : IdentificationRecord, b : IdentificationRecord) : Order.Order {
      Text.compare(a.subjectId, b.subjectId);
    };
  };

  let demoRequests = Map.empty<Text, DemoRequest>();
  let identificationRecords = Map.empty<Text, IdentificationRecord>();

  public shared ({ caller }) func submitDemoRequest(name : Text, email : Text, organization : Text, message : Text) : async () {
    let demoRequest : DemoRequest = {
      name;
      email;
      organization;
      message;
    };
    demoRequests.add(email, demoRequest);
  };

  public shared ({ caller }) func addIdentificationRecord(subjectId : Text, matchScore : Nat, dentalPatternHash : Text, status : Text) : async () {
    let record : IdentificationRecord = {
      subjectId;
      matchScore;
      dentalPatternHash;
      timestamp = Time.now();
      status;
    };
    identificationRecords.add(subjectId, record);
  };

  public query ({ caller }) func getAllDemoRequests() : async [DemoRequest] {
    demoRequests.values().toArray();
  };

  public query ({ caller }) func getAllIdentificationRecords() : async [IdentificationRecord] {
    identificationRecords.values().toArray().sort();
  };
};
