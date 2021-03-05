//=============================================================================
// RPG Maker MZ - Four Corners Battle Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Alternative battle screen layout with actor portraits in the corners.
 * @author Dan Lungaro
 *
 * @help FourCornersBattleScreen.js
 *
 * This plugin changes the layout of the battle screen.
 * 
 * It puts each actor into a corner of the screen based on parameters.
 * Can work with 1-4 actors, with varying set ups. It's possible to
 * have only bottom left and upper right or vice-versa. 
 * Battle log will adjust dependent on if there are characters in the top layer or not. 
 * 
 * Recommend first person battle as space becomes tight.
 *
 * @param Bottom Left Actor
 * @desc The actor ID
 * @type number
 * @default 1
 * 
 * @param Bottom Right Actor
 * @desc The actor ID
 * @type number
 * @default 2
 * 
 * @param Upper Right Actor
 * @desc The actor ID
 * @type number
 * @default 3
 * 
 * @param Upper Left Actor
 * @desc The actor ID
 * @type number
 * @default 4
 */

(() => {
    'use strict';
        
    const pluginName = 'FourCornersBattleScreen';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);

    const param_ActorBottomLeft  = parseInt(parameters['Bottom Left Actor'], 10);
    const param_ActorBottomRight = parseInt(parameters['Bottom Right Actor'], 10);
    const param_ActorUpperRight  = parseInt(parameters['Upper Right Actor'], 10);
    const param_ActorUpperLeft   = parseInt(parameters['Upper Left Actor'], 10);

    /*
    * Make status window size of game screen, with background completley opaque
    */
    Scene_Battle.prototype.statusWindowRect = function() {
        return new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
    };

    Scene_Battle.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        const statusWindow = new Window_BattleStatus(rect);
        statusWindow._backOpacity = 0;
        this.addWindow(statusWindow);
        this._statusWindow = statusWindow;
    };

    Window_BattleStatus.prototype.updateBackOpacity = function() {
        this.backOpacity = 0;
    };

    /*
    * Draws Actors face at each corner, dependent on params
    */
    Window_BattleStatus.prototype.drawItemImage = function(index) {
        const actor = this.actor(index);
        const rect = this.faceRect(index);
        rect.height = Graphics.boxHeight / 4;

        switch (actor._actorId) {
            case param_ActorBottomLeft:
                this.drawActorFace(actor, 
                    rect.width * .2, 
                    Graphics.boxHeight - rect.height * 1.1, 
                    rect.width, rect.height);
                break;
            case param_ActorBottomRight:
                this.drawActorFace(actor, 
                    Graphics.boxWidth - rect.width * .9, 
                    Graphics.boxHeight - rect.height * 1.1, 
                    rect.width, rect.height);
                break;
            case param_ActorUpperRight:
                this.drawActorFace(actor,
                    Graphics.boxWidth - rect.width * .9,
                    0,
                    rect.width, rect.height);
                break;
            case param_ActorUpperLeft:
                this.drawActorFace(actor,
                    rect.width * .2,
                    0,
                    rect.width, rect.height);
                break;
            default:
                this.drawActorFace(actor, rect.x, rect.y, rect.width, rect.height);
                break;
        }  
    };
    
    /*
    * Draws shadowbox and statuses in each corner
    */
    Window_BattleStatus.prototype.itemRect = function(index) {
        const actor = this.actor(index);
        const rect = new Rectangle(0,0,250, Graphics.boxHeight / 4);

        switch (actor._actorId) {
            case param_ActorBottomLeft:
                return new Rectangle(0, 
                    Graphics.boxHeight - rect.height * 1.1, 
                    rect.width, rect.height);
            case param_ActorBottomRight:
                return new Rectangle(Graphics.boxWidth - rect.width * 1.1, 
                    Graphics.boxHeight - rect.height * 1.1, 
                    rect.width, rect.height);
            case param_ActorUpperRight:
                return new Rectangle(Graphics.boxWidth - rect.width * 1.1,
                    0,
                    rect.width, rect.height);
            case param_ActorUpperLeft:
                return new Rectangle(0,
                    0,
                    rect.width, rect.height);
            default:
                break;
        }  
        //Shouldn't execute this
        return new Rectangle(0, 0, 0, 0);
    };

    Scene_Battle.prototype.updateStatusWindowPosition = function() {
        //Do nothing, we don't want portraits to shift position
    };

    /*
    * Battle log will be at top or below upper face portraits
    * dependent on if there are any portraits on the upper top layer
    */
    Scene_Battle.prototype.logWindowRect = function() {
        const wx = 0;
        const wy = containsTopLayer() ? Graphics.boxHeight / 3.8 : 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(3, false);

        return new Rectangle(wx, wy, ww, wh);
    };

    function containsTopLayer() {
        for (const actor of $gameParty.allMembers()) {
            let actId = actor._actorId;
            switch (actId) {
                case param_ActorUpperRight:
                    return true;
                case param_ActorUpperLeft:
                    return true;
                default:
                    break;
            }
        }
        return false;
    }

    /*
    * Swap LogWindow and StatusWindow for window layer precedence
    */
    Scene_Battle.prototype.createAllWindows = function() {
        this.createStatusWindow();
        this.createLogWindow();
        this.createPartyCommandWindow();
        this.createActorCommandWindow();
        this.createHelpWindow();
        this.createSkillWindow();
        this.createItemWindow();
        this.createActorWindow();
        this.createEnemyWindow();
        Scene_Message.prototype.createAllWindows.call(this);
    };

    /*
    * Move party and actor command windows to center
    */
    Scene_Battle.prototype.partyCommandWindowRect = function() {
        const ww = 192;
        const wh = this.windowAreaHeight();
        const wx = Graphics.boxWidth / 2.675;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const ww = 192;
        const wh = this.windowAreaHeight();
        const wx = Graphics.boxWidth / 2.675;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };

    /*
    * Push cancel button down out of upper right portrait
    */
   Scene_Battle.prototype.createCancelButton = function() {
    this._cancelButton = new Sprite_Button("cancel");
    this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 15;
    this._cancelButton.y = Graphics.boxHeight / 4 + 10;
    this.addWindow(this._cancelButton);
    };

})();
