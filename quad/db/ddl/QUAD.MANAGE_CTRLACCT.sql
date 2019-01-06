CREATE PROCEDURE QUAD.MANAGE_CTRLACCT @MESSAGE varchar(30), --   the message to point the SP call to the code its running, if the message is Not in the code, enter a ERROR message
                                      @IN_CtrlAcct_ID varchar(10)='', --   Controlling Account ID
                                      @IN_PCtrlAcct_ID varchar(10)='', --   Parent Controlling Account ID
                                      @IN_PPath varchar(400)='', --  This is the FULL parent path, excluding the CODE, for uniqueness (i.e.  this creates a seperate unique Index on the table, I ID is also unique) allowing a CTRL account tree to be 100 levels deep
                                      @IN_Code char(4)='', --   The 4 charcter account under its parent, for reporting
                                      @IN_Name varchar(80)='', --   The name of the Controlling Account for reporting
                                      @IN_rUser_ID varchar(10)='', --   The user that created the Controlling Account
                                      @IN_Balance varchar(20)='', --  only allow an initial balance, if its a LEAF node, with no prior accounts attached
                                      @IN_rUnit_ID varchar(10)='', --  the type of units the account will hold,  i.e.   Money, Units for inventory control, dimension counts
                                      @IN_Note_ID varchar(10)='', --  The notes for this controlling account
                                      @IN_mDrCr varchar(10)='', --  This is the debit/credit multiplier, which determines if an incomming Debit is a positive number to increase the balance
                                      @IN_Reserved varchar(10)='', --  Reserved varchar, to help assist
                                      @IN_DefAcct varchar(10)='' --  either a 1 or 0, showing its the default account, in a list of controlling accounts number the parent

AS

DECLARE @END_DATETIME DATETIME2;
DECLARE @START_DATETIME DATETIME2;
SET @START_DATETIME = sysdatetime();

DECLARE @vSTART_RTNCODE INTEGER = -1;
DECLARE @vFINISHED_RTNCODE INTEGER = -1;

DECLARE @rtn_Insert_ID INTEGER = 0;
DECLARE @rtn_Insert_Cnt INTEGER = 0;
DECLARE @rtn_Update_Cnt INTEGER = 0;
DECLARE @Message_Processed INTEGER = 0; --  this will be a 1 for a valid message w/o any errors in processing,  -1 is the message is invalid,  a positive value points to the TryCatchError ID
DECLARE @LOAD_HIST_PKID INTEGER = 0;
DECLARE @LOAD_HIST_DUMMY INTEGER = 0;

DECLARE @ERR INTEGER = 0 ;
DECLARE @ErrorSeverity INTEGER;
DECLARE @ErrorState INTEGER;
DECLARE @ErrorProcedure nvarchar(128) ;
DECLARE @ErrorLine INTEGER;
DECLARE @ErrorMessage nvarchar(4000);
DECLARE @TryCatchError_ID INTEGER = -1 ;
DECLARE @CTRL_ACCT_EXISTS INTEGER = -1 ;

DECLARE @SummaryOfChanges TABLE
                          (
                            Change VARCHAR(20)
                          );

DECLARE @vPERIOD_START_DTTM varchar(27);
DECLARE @vPERIOD_END_DTTM varchar(27);

set @vPERIOD_START_DTTM = cast(@START_DATETIME as varchar(27));
set @vPERIOD_END_DTTM = NULL;

DECLARE @CtrlAcct_ID int; --   Controlling Account ID
DECLARE @PCtrlAcct_ID int; --   Parrent Controlling Account ID
DECLARE @PPath varchar(400); --  This is the FULL parent path, excluding the CODE, for uniqueness (i.e.  this creates a seperate unique Index on the table, I ID is also unique) allowing a CTRL account tree to be 100 levels deep
DECLARE @Code char(4); --   The 4 charcter account under its parent, for reporting
DECLARE @Name char(80); --   The name of the Controlling Account for reporting
DECLARE @rUser_ID smallint; --   The user that created the Controlling Account
DECLARE @Balance numeric(16, 5); --  only allow an initial balance, if its a LEAF node, with no prior accounts attached
DECLARE @rUnit_ID smallint; --  the type of units the account will hold,  i.e.   Money, Units for inventory control, dimension counts
DECLARE @Note_ID int; --  The notes for this controlling account
DECLARE @mDrCr smallint; --  This is the debit/credit multiplier, which determines if an incomming Debit is a positive number to increase the balance
DECLARE @Reserved varchar(10); --  Reserved varchar, to help assist
DECLARE @DefAcct smallint; --  either a 1 or 0, showing its the default account, in a list of controlling accounts number the parent


BEGIN TRY
  SET @CtrlAcct_ID = cast(COALESCE(@IN_CtrlAcct_ID, 0) as int);
  SET @PCtrlAcct_ID = cast(COALESCE(@IN_PCtrlAcct_ID, 0) as int);
  SET @PPath = @IN_PPath;
  SET @Code = @IN_Code;
  SET @Name = @IN_Name;
  SET @rUser_ID = cast(COALESCE(@IN_rUser_ID, 0) as int);
  SET @Balance = cast(COALESCE(@IN_Balance, 0) as numeric(16, 5));
  SET @rUnit_ID = cast(COALESCE(@IN_rUnit_ID, 0) as smallint);
  SET @Note_ID = cast(COALESCE(@IN_Note_ID, 0) as int);
  SET @mDrCr = cast(COALESCE(@IN_mDrCr, 0) as smallint);
  SET @Reserved = @IN_Reserved;
  SET @DefAcct = cast(COALESCE(@IN_DefAcct, 0) as smallint);


END TRY
BEGIN CATCH

  SELECT @ERR = ERROR_NUMBER(),
         @ErrorSeverity = ERROR_SEVERITY(),
         @ErrorState = ERROR_STATE(),
         @ErrorProcedure = ERROR_PROCEDURE(),
         @ErrorLine = ERROR_LINE(),
         @ErrorMessage = ERROR_MESSAGE();

  EXEC MWH.MERGE_ETL_TryCatchError_wRtn 'save error', @ERR, @ErrorSeverity, @ErrorState, @ErrorProcedure, @ErrorLine,
       'conversion error', 'QUAD.MANAGE_CTRLACCT', @TryCatchError_ID OUTPUT;
END CATCH;


IF (@MESSAGE = 'ADD' and @ERR = 0)
  begin
    SET @TryCatchError_ID = 0; -- its a valid message

    BEGIN TRY
      SELECT @CTRL_ACCT_EXISTS = coalesce(ID, -1)
      from QUAD.CTRLACCT with (nolock)
      where PPath = @PPath and Code = @Code;


      IF (@CTRL_ACCT_EXISTS = -1)
        begin
          INSERT into QUAD.CTRLACCT (P_CtrlAcct_ID, PPath, Code, Name, rUser_ID, Balance, rUnit_ID, Note_ID, mDrCr,
                                     Reserved, DefAcct)
          VALUES (@PCtrlAcct_ID, @PPath, @Code, @Name, @rUser_ID, @Balance, @rUnit_ID, @Note_ID, @mDrCr, @Reserved,
                  @DefAcct);
          SET @rtn_Insert_Cnt = @@ROWCOUNT;
          SET @rtn_Insert_ID = @@IDENTITY;

          SELECT [ID],
                 [INSERT_DTTM],
                 [UPDATE_DTTM],
                 [LST_MOD_USER],
                 [P_CtrlAcct_ID],
                 [PPath],
                 [Code],
                 [Name],
                 [rUser_ID],
                 [Balance],
                 [rUnit_ID],
                 [Note_ID],
                 [NLevel],
                 [mDrCr],
                 [Reserved],
                 [DefAcct]
          from QUAD.CTRLACCT with (nolock)
          WHERE [ID] = @rtn_Insert_ID;
        end
    END TRY
    BEGIN CATCH

      SELECT @ERR = ERROR_NUMBER(),
             @ErrorSeverity = ERROR_SEVERITY(),
             @ErrorState = ERROR_STATE(),
             @ErrorProcedure = ERROR_PROCEDURE(),
             @ErrorLine = ERROR_LINE(),
             @ErrorMessage = ERROR_MESSAGE();

      EXEC MWH.MERGE_ETL_TryCatchError_wRtn 'save error', @ERR, @ErrorSeverity, @ErrorState, @ErrorProcedure,
           @ErrorLine, @ErrorMessage, 'QUAD.MANAGE_CTRLACCT', @TryCatchError_ID OUTPUT;
    END CATCH;


  END


IF (@MESSAGE = 'DISPLAY ALL' and @ERR = 0)
  begin
    SET @TryCatchError_ID = 0; -- its a valid message

    BEGIN TRY
      SELECT [ID],
             [INSERT_DTTM],
             [UPDATE_DTTM],
             [LST_MOD_USER],
             [P_CtrlAcct_ID],
             [PPath],
             [Code],
             [Name],
             [rUser_ID],
             [Balance],
             [rUnit_ID],
             [Note_ID],
             [NLevel],
             [mDrCr],
             [Reserved],
             [DefAcct]
      from QUAD.CTRLACCT with (nolock);
      SET @rtn_Insert_Cnt = @@ROWCOUNT;

    END TRY
    BEGIN CATCH

      SELECT @ERR = ERROR_NUMBER(),
             @ErrorSeverity = ERROR_SEVERITY(),
             @ErrorState = ERROR_STATE(),
             @ErrorProcedure = ERROR_PROCEDURE(),
             @ErrorLine = ERROR_LINE(),
             @ErrorMessage = ERROR_MESSAGE();

      EXEC MWH.MERGE_ETL_TryCatchError_wRtn 'save error', @ERR, @ErrorSeverity, @ErrorState, @ErrorProcedure,
           @ErrorLine, @ErrorMessage, 'QUAD.MANAGE_CTRLACCT', @TryCatchError_ID OUTPUT;
    END CATCH;
  END

SET @END_DATETIME = sysdatetime();


RETURN @ERR
go

